import { IUserSignIn, IUserSignUp } from "@src/interfaces/user";
import Joi from "joi";
import { AppError, EErrorStatus } from "../error";
import { PASSWORD_REGEX } from "@src/constants";

export const validateSignUp = (payload: IUserSignUp): IUserSignUp => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    age: Joi.number().required(),
    password: Joi.string().min(8).required().regex(PASSWORD_REGEX),
  });

  const { value, error } = schema.validate(payload);
  if (error) {
    throw new AppError(EErrorStatus.ValidationError);
  }
  return value;
};

export const validateSignIn = (payload: IUserSignIn): IUserSignIn => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { value, error } = schema.validate(payload);
  if (error) {
    throw new AppError(EErrorStatus.ValidationError);
  }
  return value;
};
