import Joi from "joi";
import { AppError, EErrorStatus } from "../error";

export const validateSignUp = (payload: Record<string, any>) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    password: Joi.string().min(8).required(),
  });

  const { value, error } = schema.validate(payload);
  if (error) {
    throw new AppError(EErrorStatus.ValidationError);
  }
  return value;
};

export const validateSignIn = (payload: Record<string, string>) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { value, error } = schema.validate(payload);
  if (error) {
    throw new AppError(EErrorStatus.ValidationError);
  }
  return value;
};
