import { Request, response, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyUserRepository } from "../repository/SurveyUserRepository";

/**
 * 
 1 2 3 4 5 6 7 8 9 10 
 Detratores => 0 - 6
 Passivos => 7 - 8
 Promotores => 9 - 10

 ((Promotores - detratores) / (Total responderam)) * 100

 */

class NpsController {
  async execute(req: Request, res: Response) {
    const { surveyId } = req.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUserRepository.find({
      surveyId,
      value: Not(IsNull()),
    });

    const detrator = surveyUsers.filter((s) => s.value <= 6).length;
    const promotor = surveyUsers.filter((s) => s.value === 9 || s.value === 10)
      .length;
    const passivo = surveyUsers.filter((s) => s.value === 7 || s.value === 8)
      .length;
    const totalSurvey = surveyUsers.length;

    const calculate = Number(
      ((promotor - detrator) / totalSurvey) * 100
    ).toFixed(2);

    res
      .status(200)
      .json({ detrator, promotor, passivo, totalSurvey, nps: calculate });
  }
}

export { NpsController };
