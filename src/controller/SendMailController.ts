import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repository/SurveyRepository";
import { SurveyUserRepository } from "../repository/SurveyUserRepository";
import { UserRepository } from "../repository/UserRepository";
import SendMailService from "../service/SendMailService";
import { resolve } from "path";
import { AppError } from "../error/AppError";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, surveyId } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const userExist = await userRepository.findOne({ email });

    if (!userExist) {
      throw new AppError("User not exist");
      // res.status(400).json({ error: "User does not exist" });
    }

    const surveyExist = await surveyRepository.findOne({ id: surveyId });

    if (!surveyExist) {
      throw new AppError("Survey does not exist");
      // res.status(400).json({ error: "Survey does not exist" });
    }

    const surveyUserExist = await surveyUserRepository.findOne({
      where: { userId: userExist.id, value: null },
    });

    const npsPath = resolve(__dirname, "..", "view", "email", "npsMail.hbs");
    const variables = {
      name: userExist.name,
      title: surveyExist.title,
      description: surveyExist.description,
      id: surveyUserExist ? surveyUserExist.id : "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserExist) {
      await SendMailService.execute(
        email,
        surveyExist.title,
        variables,
        npsPath
      );
      return res.status(200).json(surveyUserExist);
    }

    const surveyUser = surveyUserRepository.create({
      userId: userExist.id,
      surveyId: surveyExist.id,
    });
    surveyUserRepository.save(surveyUser);
    variables.id = surveyUser.id;

    await SendMailService.execute(email, surveyExist.title, variables, npsPath);

    return res.status(201).json(surveyUser);
  }
}

export { SendMailController };
