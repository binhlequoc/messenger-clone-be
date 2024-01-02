import { validateSignIn, validateSignUp } from "@src/core/validation";
import { IDecodedUserInfo } from "@src/interfaces/auth";
import { authenticateToken } from "@src/middleware/auth";
import { signIn, signUp } from "@src/services/auth.service";
import { getUser } from "@src/services/user.service";
import { errorResponse, successResponse } from "@src/utils";
import express, { Request, Response } from "express";

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

authController.get(
  "/me",
  authenticateToken,
  async (req: Request & IDecodedUserInfo, res: Response) => {
    try {
      const user = await getUser(req.id);
      return successResponse(res, user);
    } catch (error) {
      return errorResponse(res, error);
    }
  }
);

export default authController;
