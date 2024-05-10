import express from "express";
import { Auth } from "./controllers/Auth";
import { SignUpController } from "./controllers/SignUp";
import { UserController } from "./controllers/User";
import { authenticateToken } from "./middleware/auth";

const router = express.Router();
const authController = new Auth();
const userController = new UserController();
const signUpController = new SignUpController();

router.use("/auth", authController.router);

router.use("/signup", signUpController.router);

router.use("/users", authenticateToken, userController.router);

export default router;
