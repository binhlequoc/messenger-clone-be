import { Server } from "node:http";
import { Server as IoServer } from "socket.io";
export class SocketService {
  private static ioServer: IoServer;
  private static createServer(app: Server) {
    this.ioServer = new IoServer(app);
  }
  static getSocket() {
    return this.ioServer;
  }
  static init(app: Server) {
    this.createServer(app);
  }
}
