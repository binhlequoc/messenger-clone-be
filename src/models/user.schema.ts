import bcrypt from "bcryptjs";
import { Document, Model, Schema, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema: Schema<IUser, IUserMethods> = new Schema<IUser, IUserMethods>(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
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
      require: true,
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
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

UserSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const User = model<IUser, UserModel>("User", UserSchema);
