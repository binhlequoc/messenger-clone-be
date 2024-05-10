import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "module-alias/register";
import { createServer } from "node:http";
import { connectDatabase } from "./core/database";
import router from "./router";
import { SocketService } from "./services/socket.service";
import { successResponse } from "./utils";
import { authenticateToken, authenticateTokenSocket } from "./middleware/auth";

dotenv.config();
const app = express();
const server = createServer(app);
SocketService.init(server);

const startApp = async () => {
  await connectDatabase();

  app.use(
    cors({
      origin: process.env.WEB_URL,
      optionsSuccessStatus: 200,
    })
  );

  app.use(express.json());

  app.get("/", (_, res) => {
    return successResponse(res, "Messenger Clone API");
  });

  app.use("/api/v1", router);

  server.listen(process.env.PORT, () => {
    console.log(`App listen on port ${process.env.PORT}`);
    return;
  });

  SocketService.getSocket().use(authenticateTokenSocket);

  SocketService.getSocket().on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};

startApp();
