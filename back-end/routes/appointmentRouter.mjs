import express from "express";
import {
  acceptAppointment,
  countPendingAppointments,
  deleteAppointment,
  finishAppointement,
  getDoctorAppointments,
} from "../controller/appointmentController.mjs";

const appointmentRouter = express.Router();

appointmentRouter.get("/:doctorId/appointments", getDoctorAppointments);
// Chấp nhận appointment
appointmentRouter.post("/accept-appointment", acceptAppointment);

// Xóa appointment
appointmentRouter.delete("/delete-appointment", deleteAppointment);

appointmentRouter.post("/finish-appointment", finishAppointement);
appointmentRouter.get(
  "/count-pending-appointments/:doctorId",
  countPendingAppointments
);

export default appointmentRouter;
