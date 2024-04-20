import { AppError } from "@src/core/error";
import { Controller } from "../controller";

export class Auth extends Controller {
  constructor() {
    super();
  }

  async get() {
    throw new AppError(404);
  }

  async post() {
    return null;
  }

  async put() {
    throw new AppError(404);
  }

  async patch() {
    throw new AppError(404);
  }

  async delete() {
    throw new AppError(404);
  }
}
