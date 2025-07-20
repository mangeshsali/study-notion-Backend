import express from "express";
import { Middleware } from "../middleware";
import { AuthController } from "./controller";
import { AuthValidator } from "./validator";
import { controllerHandler } from "../middleware/controllerHandler";
export const AuthRouter = express.Router();

AuthRouter.post(
  "/login",
  Middleware.isBodyPresent,
  AuthValidator.loginValidator,
  controllerHandler(AuthController.login)
);

AuthRouter.post(
  "/signup",
  Middleware.isBodyPresent,
  AuthValidator.signupValidator,
  controllerHandler(AuthController.signup)
);
