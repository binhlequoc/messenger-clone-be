import express from "express";
import { authenticateToken } from "./middleware/auth";
import { errorResponse, successResponse } from "./utils";
import authController from "./controllers/Auth";
import userController from "./controllers/User";

const router = express.Router();

router.use("/auth", authController);

router.use("/users", userController);

router.get("/", (_, res) => {
  return successResponse(res, "API v1");
});

export default router;
