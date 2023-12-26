import { authenticateToken } from "@src/middleware/auth";
import { errorResponse, successResponse } from "@src/utils";
import express from "express";

const authController = express.Router();

authController.post("/sign-in", (req, res) => {
  try {
    return successResponse(res, "Sign In API");
  } catch (error) {
    return errorResponse(res, 500);
  }
});

authController.post("/sign-up", (req, res) => {
  try {
    return successResponse(res, "Sign up API");
  } catch (error) {
    return errorResponse(res, 500);
  }
});

authController.get("/me", authenticateToken, (req, res) => {
  try {
    return successResponse(res, "Me API");
  } catch (error) {
    return errorResponse(res, 500);
  }
});

export default authController;
