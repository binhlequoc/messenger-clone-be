import { UserService } from "@src/services/user.service";
import { Controller } from "../controller";

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
