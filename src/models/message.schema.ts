import { Model, Schema, SchemaDefinitionProperty, model } from "mongoose";
import { User } from "./user.schema";

export interface IMessage extends Document {
  userId: SchemaDefinitionProperty<string>;
  roomId: SchemaDefinitionProperty<string>;
  text: string;
  files: string[];
  isRead: boolean;
}

export interface IMessageMethods {}

export type MessageModel = Model<IMessage, {}, IMessageMethods>;

const MessageSchema = new Schema<IMessage, MessageModel>(
  {
    userId: {
      required: true,
      ref: User.name,
      type: Schema.Types.ObjectId,
    },
    roomId: {
      required: true,
    },
    text: {
      required: true,
      type: String,
      min: 0,
    },
    files: [
      {
        type: String,
        required: true,
      },
    ],
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.updatedAt;
    return ret;
  },
});

MessageSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Message = model<IMessage, MessageModel>("Message", MessageSchema);
