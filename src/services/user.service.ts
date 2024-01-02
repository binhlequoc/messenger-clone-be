import { User } from "@src/models/user.schema";

export const getUsers = async () => {
  await User.find({});
};

export const getUser = async (id: string) => {
  return await User.findById(id);
};
