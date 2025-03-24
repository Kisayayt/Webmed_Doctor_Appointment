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

export const getDoctorList = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", specialty = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
      ];
    }

    if (specialty) {
      query.specialty = specialty;
    }

    const doctors = await doctorModel
      .find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalDoctors = await doctorModel.countDocuments(query);

    res.json({
      totalDoctors,
      totalPages: Math.ceil(totalDoctors / limit),
      currentPage: page,
      doctors,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getSpecialties = async (req, res) => {
  try {
    const specialties = await doctorModel.distinct("specialty");
    res.json(specialties);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
