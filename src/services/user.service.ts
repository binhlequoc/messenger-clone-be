import { IUser, User } from "@src/models/user.schema";
import { Service } from "./service";
import { IUserFilter } from "@src/interfaces/user";

export class UserService extends Service {
  async create(payload: IUser) {
    await User.create(payload);
  }

  async find({ email, fullName }: IUserFilter) {
    return await User.find({
      ...(email && { email: email }),
      ...(fullName && {
        fullName: {
          $regex: fullName,
          $options: "i",
        },
      }),
    });
  }

  async findOne() {}

  async update() {}

  async delete() {}
}
