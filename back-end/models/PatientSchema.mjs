import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, default: "patient" },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    medical_history: [{ type: String }],
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
  },
  { timestamps: true }
);

const patientModel = mongoose.model("Patient", patientSchema, "Patients");

export default patientModel;
