import { Response } from "express";
import httpStatus from "http-status";

export const successResponse = (res: Response, data: any) => {
  return res.status(200).json({
    data: data,
  });
};

export const errorResponse = (res: Response, statusCode: number) => {
  if (`${statusCode}` === httpStatus[401]) {
    return res.status(statusCode).send(httpStatus["401_MESSAGE"]);
  }
};
