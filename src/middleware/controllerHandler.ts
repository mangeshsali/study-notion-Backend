import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";

export const controllerHandler = (
  next: (request: Request, response: Response) => void
) => {
  return (request: Request, response: Response) => {
    const errors = errorHandler(request, response);
    if (errors) return errors;

    return next(request, response);
  };
};
