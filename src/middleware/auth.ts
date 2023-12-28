import { IDecodedUserInfo } from "@src/interfaces/auth";
import { IUserDto } from "@src/interfaces/user";
import { NextFunction, Request, Response } from "express";
import { verify, sign } from "jsonwebtoken";

export const authenticateToken = (
  req: Request & IDecodedUserInfo,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) {
    return res.status(403).json({
      error: "Authentication failed",
    });
  }
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const userInfo = verify(token, process.env.SECRET) as IDecodedUserInfo;
    req.id = userInfo.id;
    req.email = userInfo.email;
    next();
  } catch (error) {
    return res.status(403).json({
      error: "Authentication failed",
    });
  }
};

export const createToken = async (user: IUserDto & { id: string }) => {
  return await sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.SECRET,
    { expiresIn: "30d" }
  );
};
