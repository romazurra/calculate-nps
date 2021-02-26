import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../model/Survey";

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> {}

export { SurveyRepository };
