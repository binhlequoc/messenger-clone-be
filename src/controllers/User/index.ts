import { authenticateToken } from "@src/middleware/auth";
import express from "express";

const userController = express.Router();

userController.use(authenticateToken);

export default userController;
