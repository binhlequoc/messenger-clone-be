import { successResponse } from "./utils";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "module-alias/register";

import { connectDatabase } from "./core/database";
import router from "./router";

dotenv.config();
const app = express();

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

  app.listen(process.env.PORT, () => {
    console.log(`App listen on port ${process.env.PORT}`);
    return;
  });
};

startApp();
