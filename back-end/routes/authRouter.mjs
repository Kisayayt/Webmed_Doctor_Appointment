import express from "express";
import {
  Login,
  register,
  RegisterForDoctor,
  uploadAvatar,
} from "../controller/authController.mjs";

const authRouter = express.Router();

authRouter.post("/register", uploadAvatar, register);
authRouter.post("/login", Login);
authRouter.post("/register-doctor", uploadAvatar, RegisterForDoctor);

export default authRouter;
