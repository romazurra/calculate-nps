import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repository/SurveyRepository";

class SurveyController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const suveyRepository = getCustomRepository(SurveyRepository);

    const survey = suveyRepository.create({ title, description });
    await suveyRepository.save(survey);

    return res.status(201).json(survey);
  }

  async list(req: Request, res: Response) {
    const suveyRepository = getCustomRepository(SurveyRepository);
    const surveys = await suveyRepository.find();
    res.send(surveys);
  }
}

export { SurveyController };
