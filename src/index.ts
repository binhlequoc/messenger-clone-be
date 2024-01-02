import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import "module-alias/register";
import { successResponse } from "./utils";
import { Server } from "socket.io";
import { connectDatabase } from "./core/database";
import router from "./router";
import http from "http";
import { IApp } from "./interfaces";

dotenv.config();
const app: Express & IApp = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const startApp = async () => {
  await connectDatabase();

  app.use(
    cors({
      origin: process.env.WEB_URL,
      optionsSuccessStatus: 200,
    })
  );

  app.use(express.json());

  app.io = io;

  app.get("/", (_, res) => {
    return successResponse(res, "Messenger Clone API");
  });

  app.use("/api/v1", router);

  httpServer.listen(process.env.PORT, () => {
    console.log(`App listen on port ${process.env.PORT}`);
    return;
  });
};

startApp();
