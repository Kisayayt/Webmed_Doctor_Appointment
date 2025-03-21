import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    about: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    age: { type: Number, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    available_slots: [{ type: Date }],
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("Doctor", doctorSchema, "Doctors");

export default doctorModel;
