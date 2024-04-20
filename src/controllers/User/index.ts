import { authenticateToken } from "@src/middleware/auth";
import express from "express";
import { Controller } from "../controller";
import { UserService } from "@src/services/user.service";

export class UserController extends Controller {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  async get() {
    return await this.userService.find({});
  }

  async post() {
    return null;
  }

  async put() {
    return null;
  }

  async patch() {
    return null;
  }

  async delete() {
    return null;
  }
}
