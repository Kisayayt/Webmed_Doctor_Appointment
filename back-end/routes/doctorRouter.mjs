import express from "express";
import {
  getDoctorDetails,
  getTopDoctors,
} from "../controller/doctorController.mjs";

const doctorRouter = express.Router();

doctorRouter.get("/get-top-doctor", getTopDoctors);
doctorRouter.get("/get-detail-doctor/:id", getDoctorDetails);

export default doctorRouter;
