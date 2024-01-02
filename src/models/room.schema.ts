import { Document, Model, Schema, SchemaDefinitionProperty, model } from "mongoose";
import { User } from "./user.schema";

export interface IRoom extends Document {
  //userId
  ownerId: SchemaDefinitionProperty<string>;
  friendIds: SchemaDefinitionProperty<string>[];
  name: string;
}

export interface IRoomMethods {}

export type RoomModel = Model<IRoom, {}, IRoomMethods>;

const RoomSchema = new Schema<IRoom, RoomModel>(
  {
    ownerId: {
      required: true,
      ref: User.name,
      type: Schema.Types.ObjectId,
    },
    friendIds: [
      {
        required: true,
        ref: User.name,
        type: Schema.Types.ObjectId,
      },
    ],
    name: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

RoomSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.updatedAt;
    return ret;
  },
});

RoomSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Room = model<IRoom, RoomModel>("Room", RoomSchema);
