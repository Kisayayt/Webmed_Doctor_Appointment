import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model(
  "Appointment",
  appointmentSchema,
  "Appointments"
);

export default appointmentModel;
