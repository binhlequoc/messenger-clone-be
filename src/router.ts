import express from "express";
import { authenticateToken } from "./middleware/auth";
import { errorResponse, successResponse } from "./utils";
import { Auth } from "./controllers/Auth";
import { UserController } from "./controllers/User";

const router = express.Router();
const authController = new Auth();
const userController = new UserController();
router.use("/auth", authController.router);

router.use("/users", userController.router);

router.get("/", (_, res) => {
  return successResponse(res, "API v1");
});

export default router;
