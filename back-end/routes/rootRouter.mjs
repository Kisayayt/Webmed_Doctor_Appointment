import express from "express";
import authRouter from "./authRouter.mjs";
import userRouter from "./userRouter.mjs";
import doctorRouter from "./doctorRouter.mjs";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/doctor", doctorRouter);

export default rootRouter;
