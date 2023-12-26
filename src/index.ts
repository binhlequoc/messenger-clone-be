import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "module-alias/register";
import { successResponse } from "@src/utils";

import router from "./router";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.WEB_URL,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (_, res) => {
  return successResponse(res, "Messenger Clone API");
});

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`App listen on port ${process.env.PORT}`);
  return;
});
