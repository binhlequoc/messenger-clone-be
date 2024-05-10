import { Request, Response } from "express";
import { Controller } from "../controller";
import { validateSignUp } from "@src/core/validation";
import { AppError } from "@src/core/error";
import { AuthService } from "@src/services/auth.service";

export class SignUpController extends Controller {
  private authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
  }

  async get() {
    return null;
  }

  async post(req: Request) {
    const value = validateSignUp(req.body);
    await this.authService.signUp(value);
    return {
      message: "User created successfully",
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
