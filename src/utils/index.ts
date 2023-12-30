import { AppError } from "@src/core/error";
import { Response } from "express";

export const successResponse = (res: Response, data: any) => {
  return res.status(200).json({
    data: data,
  });
};

export const errorResponse = (res: Response, error: AppError) => {
  return res.status(error.status).json({
    error: error.message,
  });
};
