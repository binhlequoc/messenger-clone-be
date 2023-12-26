import { authenticateToken } from "@src/middleware/auth";
import { errorResponse, successResponse } from "@src/utils";
import express from "express";

const userController = express.Router();

userController.use(authenticateToken);

userController.get("/me", (req, res) => {
  try {
    return successResponse(res, "Get me API");
  } catch (error) {
    return errorResponse(res, 500);
  }
});

export default userController;
