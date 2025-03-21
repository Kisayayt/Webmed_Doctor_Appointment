import express from "express";
import authenticate from "../middleware/authMiddleware.mjs";
import { getUser, updateProfile } from "../controller/userController.mjs";
import {
  bookAppointment,
  getAppointment,
} from "../controller/bookController.mjs";

const userRouter = express.Router();

userRouter.get("/profile", authenticate, getUser);
userRouter.put("/update-profile", authenticate, updateProfile);
userRouter.post("/book-appointment", authenticate, bookAppointment);
userRouter.post("/get-appointment/:id", authenticate, getAppointment);

export default userRouter;
