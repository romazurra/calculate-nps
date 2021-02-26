import * as express from "express";
import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import createConnection from "./database";
import { AppError } from "./error/AppError";
import { router } from "./router";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
});

export { app };
