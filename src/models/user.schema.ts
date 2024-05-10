import { mongooseInstance } from "@src/core/database/index";
import { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { PASSWORD_REGEX } from "@src/constants";

export interface IUser {
  email: string;
  fullName: string;
  age: number;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUserDocument, {}, IUserMethods>;

const UserSchema: Schema<IUserDocument, IUserMethods> = new Schema<
  IUserDocument,
  IUserMethods
>(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
      min: 1,
    },
    password: {
      type: String,
      minlength: 8,
      require: true,
      match: PASSWORD_REGEX,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.method("comparePassword", async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
UserSchema.set("toObject", { transform: true });

export const User = mongooseInstance.model<IUserDocument, UserModel>(
  "User",
  UserSchema
);
