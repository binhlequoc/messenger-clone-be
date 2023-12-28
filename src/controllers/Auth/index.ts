import { authenticateToken } from "@src/middleware/auth";
import { signUp } from "@src/services/auth.service";
import { getUsers } from "@src/services/user_services";
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

authController.post("/sign-up", async (req, res) => {
  try {
    const token = await signUp(req.body);
    return successResponse(res, {
      token: token,
    });
  } catch (error) {
    return errorResponse(res, 500);
  }
});

authController.get("/me", authenticateToken, async (req, res) => {
  try {
    await getUsers();
    return successResponse(res, "Me API");
  } catch (error) {
    return errorResponse(res, 500);
  }
});

export default authController;
