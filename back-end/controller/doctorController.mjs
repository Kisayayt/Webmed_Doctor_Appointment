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

export const addAvailableSlot = async (req, res) => {
  try {
    const { doctorId, slot } = req.body; // Nhận doctorId và slot từ client

    console.log(doctorId, slot);

    // Tìm bác sĩ theo ID
    const doctor = await doctorModel.findById(doctorId);
    console.log(doctor);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Thêm slot nếu chưa tồn tại
    if (
      !doctor.available_slots.some(
        (s) => s.getTime() === new Date(slot).getTime()
      )
    ) {
      doctor.available_slots.push(new Date(slot));
      await doctor.save();
    }

    res.status(200).json({
      message: "Slot added successfully",
      available_slots: doctor.available_slots,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ available_slots: doctor.available_slots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const removeAvailableSlot = async (req, res) => {
  try {
    const { doctorId, slot } = req.body;

    console.log(doctorId, slot);

    if (!doctorId || !slot) {
      return res.status(400).json({ message: "Missing doctorId or slot" });
    }

    // Tìm bác sĩ theo ID
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Xóa slot khỏi danh sách available_slots
    doctor.available_slots = doctor.available_slots.filter(
      (existingSlot) =>
        existingSlot.toISOString() !== new Date(slot).toISOString()
    );

    // Lưu lại vào database
    await doctor.save();

    return res.json({ available_slots: doctor.available_slots });
  } catch (error) {
    console.error("Error removing slot:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
