import { Router } from "express";
import { UserController } from "./controller/UserController";
import { SurveyController } from "./controller/SurveyController";
import { SendMailController } from "./controller/SendMailController";
import { AnswerController } from "./controller/AnswerController";
import { NpsController } from "./controller/NpsController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerlController = new AnswerController();
const npsController = new NpsController();

router.get("/users", userController.list);
router.post("/users", userController.create);

router.get("/surveys", surveyController.list);
router.post("/surveys", surveyController.create);

router.post("/sendEmail", sendMailController.execute);

router.get("/answers/:value", answerlController.execute);

router.get("/nps/:surveyId", npsController.execute);

export { router };
