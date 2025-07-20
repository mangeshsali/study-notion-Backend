import { Request, Response } from "express";
import bcrpty from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../utils/db";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password: inputPassword } = req.body;
    const findUser = await db.user.findUnique({ where: { email } });

    if (!findUser) {
      return res.status(404).json({ sucess: false, message: "User not found" });
    }

    const isPasswordValid = await bcrpty.compare(
      inputPassword,
      findUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const payload = {
      userId: findUser.id,
      email: findUser.email,
      role: findUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });

    const { password, ...userWithoutPassword } = findUser;

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: {
        token,
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
