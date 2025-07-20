require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../utils/db";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const jwtExpire = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const findUser = await db.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (!findUser) {
      return res.status(403).json({ message: "User does not exist" });
    }

    req.user = findUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
