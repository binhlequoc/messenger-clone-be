import { AppError, EErrorStatus } from "@src/core/error";
import { IDecodedUserInfo } from "@src/interfaces/auth";
import { errorResponse } from "@src/utils";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { Socket } from "socket.io";

export const authenticateToken = (
  req: Request & IDecodedUserInfo,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers["authorization"]) {
      throw new AppError(EErrorStatus.AuthorizationError);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");
    const userInfo = verify(token, process.env.SECRET) as IDecodedUserInfo;
    req.id = userInfo.id;
    req.email = userInfo.email;
    next();
  } catch (error) {
    return errorResponse(res, new AppError(EErrorStatus.AuthorizationError));
  }
};

export const createToken = async (user: { id: string; email: string }) => {
  return await sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.SECRET,
    { expiresIn: "30d" }
  );
};

export const authenticateTokenSocket = (socket: Socket, next: NextFunction) => {
  try {
    if (!socket.request.headers["authorization"]) {
      throw new AppError(EErrorStatus.AuthorizationError);
    }

    const token = socket.request.headers["authorization"].replace(
      "Bearer ",
      ""
    );
    const userInfo = verify(token, process.env.SECRET) as IDecodedUserInfo;
    console.log("[userInfo]", userInfo);
    next();
  } catch (error) {
    console.log("[Socket error]: ", error);
    next(new AppError(EErrorStatus.AuthorizationError));
  }
};
