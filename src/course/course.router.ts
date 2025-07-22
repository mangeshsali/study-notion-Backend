import express from "express";
import { Middleware } from "../middleware";
import { CourseController } from "./controller";

export const CourseRouter = express.Router();

CourseRouter.post(
  "/createCourse",
  Middleware.jwtExpire,
  Middleware.isBodyPresent,
  Middleware.controllerHandler(CourseController.createCourse)
);
