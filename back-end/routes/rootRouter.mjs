import express from "express";
import authRouter from "./authRouter.mjs";
import userRouter from "./userRouter.mjs";
import doctorRouter from "./doctorRouter.mjs";
import appointmentRouter from "./appointmentRouter.mjs";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/doctor", doctorRouter);
rootRouter.use("/appointment", appointmentRouter);

export default rootRouter;
