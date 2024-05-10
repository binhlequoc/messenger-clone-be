import { IRoom, Room } from "@src/models/room.schema";
import { Service } from "./service";

export class RoomService extends Service {
  find(filter: Record<string, any>): Promise<any> {
    throw new Error("Method not implemented.");
  }

  findOne(filter: Record<string, any>): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async create(data: IRoom) {
    return Room.create(data);
  }

  async findByUser(userId: string) {
    return Room.find({
      members: {
        $in: [userId],
      },
    });
  }

  update(data: Record<string, any>): Promise<any> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
