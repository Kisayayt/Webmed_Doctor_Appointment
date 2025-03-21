import mongoose from "mongoose";

const medicineOrderSchema = new mongoose.Schema(
  {
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    medicine_list: [
      {
        name: { type: String, required: true },
        dose: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

const medicineOrderModel = mongoose.model(
  "MedicineOrder",
  medicineOrderSchema,
  "MedicineOrders"
);

export default medicineOrderModel;
