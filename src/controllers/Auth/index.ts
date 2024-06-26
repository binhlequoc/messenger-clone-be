import { AppError } from "@src/core/error";
import { Controller } from "../controller";
import { validateSignIn } from "@src/core/validation";
import { Request } from "express";
import { AuthService } from "@src/services/auth.service";

export class Auth extends Controller {
  private authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
  }

  async get() {
    throw new AppError(404);
  }

  async post(req: Request) {
    const value = validateSignIn(req.body);
    const token = await this.authService.signIn(value);
    return {
      data: {
        token,
      },
    };
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
