import { User } from "@src/models/user.schema";

export const getUsers = async () => {
  await User.find({});
};
