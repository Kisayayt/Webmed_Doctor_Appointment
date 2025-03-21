import doctorModel from "../models/DoctorSchema.mjs";
import moment from "moment-timezone";
export const getTopDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password").limit(10);
    res.json(doctors);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getDoctorDetails = async (req, res) => {
  try {
    const doctor = await doctorModel
      .findById(req.params.id)
      .select("-password");

    const formattedSlots = doctor.available_slots.map((slot) =>
      moment(slot).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD hh:mm A")
    );
    res.json({ ...doctor.toObject(), available_slots: formattedSlots });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
