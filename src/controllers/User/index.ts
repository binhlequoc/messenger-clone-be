import { authenticateToken } from "@src/middleware/auth";
import { getUsers } from "@src/services/user_services";
import { errorResponse, successResponse } from "@src/utils";
import express from "express";

const userController = express.Router();

userController.use(authenticateToken);

userController.get("/me", async (req, res) => {
  try {
    await getUsers();
    return successResponse(res, "Get me API");
  } catch (error) {
    return errorResponse(res, 500);
  }
});

export default userController;
