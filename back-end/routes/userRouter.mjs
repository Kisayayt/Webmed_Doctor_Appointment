import express from "express";
import authenticate from "../middleware/authMiddleware.mjs";
import { getUser, updateProfile } from "../controller/userController.mjs";
import {
  bookAppointment,
  getAppointment,
  getAppointmentsForUser,
} from "../controller/bookController.mjs";

const userRouter = express.Router();

userRouter.get("/profile", authenticate, getUser);
userRouter.put("/update-profile", authenticate, updateProfile);
userRouter.post("/book-appointment", authenticate, bookAppointment);
userRouter.post("/get-appointment/:id", authenticate, getAppointment);

userRouter.get("/user-appointments", authenticate, getAppointmentsForUser);

export default userRouter;
