import { IDecodedUserInfo } from "@src/interfaces/auth";
import { errorResponse } from "@src/utils";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authenticateToken = (
  req: Request & IDecodedUserInfo,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) {
    throw Error("Missing headers");
  }
  const token = req.headers["authorization"].replace("Bearer ", "");
  const userInfo = verify(token, process.env.SECRET) as IDecodedUserInfo;
  req.id = userInfo.id;
  req.email = userInfo.email;
  next();
};
