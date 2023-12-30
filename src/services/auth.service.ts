import { AppError, EErrorStatus } from "@src/core/error";
import { IUserDto, IUserSignIn } from "@src/interfaces/user";
import { createToken } from "@src/middleware/auth";
import { User } from "@src/models/user.schema";
import bcrypt from "bcryptjs";

export const signUp = async (payload: IUserDto) => {
  const existUser = await User.findOne({
    email: payload.email,
  });
  if (existUser) throw new Error("Email is existing");
  const createUser = await User.create(payload);
  return await createToken({
    ...payload,
    id: createUser.id,
  });
};

export const signIn = async (payload: IUserSignIn) => {
  const user = await User.findOne({
    email: payload.email,
  });

  const isValidPassword = await bcrypt.compare(payload.password, user.password);
  if (!isValidPassword) throw new AppError(EErrorStatus.AuthorizationError);

  return await createToken({
    ...user,
    id: user.id,
  });
};
