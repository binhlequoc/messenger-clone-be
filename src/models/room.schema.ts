import { mongooseInstance } from "@src/core/database";
import { Document, Model, Schema, SchemaDefinitionProperty } from "mongoose";

export interface IRoom {
  name?: string;
  owner?: SchemaDefinitionProperty<string>;
  members: SchemaDefinitionProperty<string>[];
}

interface IRoomDocument extends IRoom, Document {}

interface IRoomMethods {}

type RoomModel = Model<IRoomDocument, {}, IRoomMethods>;

const RoomSchema = new Schema<IRoomDocument, IRoomMethods>({
  name: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Room = mongooseInstance.model<IRoomDocument, RoomModel>(
  "Room",
  RoomSchema
);
