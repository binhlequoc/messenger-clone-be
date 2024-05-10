import { AppError, EErrorStatus } from "@src/core/error";
import { IUserSignIn, IUserSignUp } from "@src/interfaces/user";
import { createToken } from "@src/middleware/auth";
import { User } from "@src/models/user.schema";

export class AuthService {
  async signUp(payload: IUserSignUp) {
    const existUser = await User.findOne({
      email: payload.email,
    });
    if (existUser)
      throw new AppError(EErrorStatus.BadRequestError, "User already exists");
    await User.create(payload);
  }

  async signIn(payload: IUserSignIn) {
    const user = await User.findOne({
      email: payload.email,
    });
    console.log("[user]", user);
    if (!user) throw new AppError(EErrorStatus.AuthorizationError);

    const isValidPassword = await user.comparePassword(payload.password);
    if (!isValidPassword) throw new AppError(EErrorStatus.AuthorizationError);

    return await createToken({
      id: user.id,
      email: user.email,
    });
  }
}
