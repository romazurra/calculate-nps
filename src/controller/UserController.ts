import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import * as yup from "yup";
import { AppError } from "../error/AppError";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome obrigatório"),
      email: yup.string().email().required("Email incorreto"),
    });

    // primeiro tipo de validar
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ erro: "Validation Failed" });
    // }

    // segundo tipo de validar
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
      // return res.status(400).json({ error });
    }

    const userRepository = getCustomRepository(UserRepository);
    const userEmailExist = await userRepository.findOne({ email });
    if (userEmailExist) {
      throw new AppError("Usuário com email existente");
      // return res.status(400).json({ error: "Usuário com email existente" });
    }
    const user = userRepository.create({ name, email });
    await userRepository.save(user);

    return res.status(201).json(user);
  }

  async list(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    res.send(users);
  }
}

export { UserController };
