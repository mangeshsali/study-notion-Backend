import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UTIL } from "./Errors";

export const errorHandler = (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    console.log("errors - ", errors);
    return response.status(400).json({ ...UTIL.NN_03, errors: errors.array() });
  }
  return null;
};
