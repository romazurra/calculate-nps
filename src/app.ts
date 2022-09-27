import * as express from "express";
import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import createConnection from "./database";
import { AppError } from "./error/AppError";
import { router } from "./router";

// Add this to the VERY top of the first file loaded in your app
const apm = require("elastic-apm-node").start({
  // Override the service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: "",

  // Use if APM Server requires a secret token
  secretToken: "iaUs54QxjGiZ7kfEGI",

  // Set the custom APM Server URL (default: http://localhost:8200)
  serverUrl:
    "https://343329223e5c4ade815fe6fc388a1e51.apm.us-central1.gcp.cloud.es.io:443",

  // Set the service environment
  environment: "production",

  logger: require("console-log-level")(),
});

createConnection();
// var err = new Error("Ups, something broke!");

// apm.captureError(err);
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
