import { IUserDto } from "@src/interfaces/user";
import { createToken } from "@src/middleware/auth";
import { User } from "@src/models/user.schema";

export const signUp = async (user: IUserDto) => {
  const existUser = await User.findOne({
    email: user.email,
  });
  if (existUser) throw new Error("Email is existing");
  const createUser = await User.create(user);
  return await createToken({
    ...user,
    id: createUser.id,
  });
};
