import express from "express";
import {
  addAvailableSlot,
  getAvailableSlots,
  getDoctorDetails,
  getDoctorList,
  getSpecialties,
  getTopDoctors,
  removeAvailableSlot,
} from "../controller/doctorController.mjs";
import {
  countDoctors,
  finishAppointement,
} from "../controller/appointmentController.mjs";

const doctorRouter = express.Router();

doctorRouter.get("/get-top-doctor", getTopDoctors);
doctorRouter.get("/get-detail-doctor/:id", getDoctorDetails);
doctorRouter.get("/get-doctor-list", getDoctorList);
doctorRouter.get("/get-specialty-list", getSpecialties);

doctorRouter.post("/add-available-slot", addAvailableSlot);
doctorRouter.get("/:doctorId/available-slots", getAvailableSlots);
doctorRouter.post("/remove-available-slot", removeAvailableSlot);

doctorRouter.get("/count-doctor", countDoctors);

export default doctorRouter;
