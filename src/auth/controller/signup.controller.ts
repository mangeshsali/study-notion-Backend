import { Request, Response } from "express";
import bcrpty from "bcrypt";
import db from "../../utils/db";
import { Prisma } from "@prisma/client";

export const signup = async (req: Request, res: Response) => {
  const SALT_ROUNDS = 12;
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const hashedPassword = await bcrpty.hash(password, SALT_ROUNDS);
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: `User with this ${error.meta?.target} already exists`,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
