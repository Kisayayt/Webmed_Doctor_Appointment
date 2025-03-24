import express from "express";
import {
  getDoctorDetails,
  getDoctorList,
  getSpecialties,
  getTopDoctors,
} from "../controller/doctorController.mjs";

const doctorRouter = express.Router();

doctorRouter.get("/get-top-doctor", getTopDoctors);
doctorRouter.get("/get-detail-doctor/:id", getDoctorDetails);
doctorRouter.get("/get-doctor-list", getDoctorList);
doctorRouter.get("/get-specialty-list", getSpecialties);

export default doctorRouter;
