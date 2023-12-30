import { validateSignIn, validateSignUp } from "@src/core/validation";
import { authenticateToken } from "@src/middleware/auth";
import { signIn, signUp } from "@src/services/auth.service";
import { getUsers } from "@src/services/user.service";
import { errorResponse, successResponse } from "@src/utils";
import express from "express";

const authController = express.Router();

authController.post("/sign-in", async (req, res) => {
  try {
    const payload = validateSignIn(req.body);
    const token = await signIn(payload);
    return successResponse(res, { token: token });
  } catch (error) {
    console.log("Error", error.message);
    return errorResponse(res, error);
  }
});

authController.post("/sign-up", async (req, res) => {
  try {
    const payload = validateSignUp(req.body);
    const token = await signUp(payload);
    return successResponse(res, {
      token: token,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

authController.get("/me", authenticateToken, async (req, res) => {
  try {
    await getUsers();
    return successResponse(res, "Me API");
  } catch (error) {
    return errorResponse(res, error);
  }
});

export default authController;
