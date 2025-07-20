import { Request, Response, NextFunction } from "express";

export const isBodyPresent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body is missing or empty",
    });
  }
  next();
};
