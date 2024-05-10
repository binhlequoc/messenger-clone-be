import { IMessage, Message } from "@src/models/message.schema";
import { Service } from "./service";
import { IMessageFilter } from "@src/interfaces/message";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "@src/constants";

export class MessageService extends Service {
  async create(data: IMessage) {
    return Message.create(data);
  }

  async find(filter: Record<string, any>) {}

  async findOne(filter: Record<string, any>) {}

  async findByRoom({
    room,
    content,
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  }: IMessageFilter) {
    return Message.find({
      room: room,
      ...(content && {
        content: {
          $regex: content,
          $options: "i",
        },
      }),
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .exec();
  }

  async update(data: Record<string, any>) {}

  async delete(id: string) {
    return Message.findByIdAndDelete(id);
  }
}
