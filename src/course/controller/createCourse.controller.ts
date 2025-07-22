import { Request, Response } from "express";
import { HandleServerError } from "../../utils/handleServerError";
import db from "../../utils/db";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: string };
    const {
      courseTitle,
      shortDescription,
      price,
      categoryId,
      thumbnail,
      benefits,
      requirements,
    } = req.body;

    const findCategory = await db.category.findUnique({
      where: { id: categoryId },
    });
    if (!findCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const course = await db.course.create({
      data: {
        courseTitle,
        shortDescription,
        price,
        categoryId,
        thumbnail,
        benefits,
        requirements,
        userId: id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    return HandleServerError(res, error);
  }
};
