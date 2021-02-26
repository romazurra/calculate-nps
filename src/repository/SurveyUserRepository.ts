import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../model/SurveyUser";

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser> {}

export { SurveyUserRepository };
