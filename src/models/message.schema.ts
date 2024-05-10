import { mongooseInstance } from "@src/core/database";
import { Document, Model, Schema, SchemaDefinitionProperty } from "mongoose";

export interface IMessage {
  room: SchemaDefinitionProperty<string>;
  content: string;
  sender: SchemaDefinitionProperty<string>;
}

interface IMessageDocument extends IMessage, Document {}

interface IMessageMethods {}

type MessageModel = Model<IMessageDocument, {}, IMessageMethods>;

const MessageSchema = new Schema<IMessageDocument, IMessageMethods>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    content: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongooseInstance.model<IMessageDocument, MessageModel>(
  "Message",
  MessageSchema
);
