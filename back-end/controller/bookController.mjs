import appointmentModel from "../models/AppointmentSchema.mjs";
import doctorModel from "../models/DoctorSchema.mjs";

export const bookAppointment = async (req, res) => {
  try {
    const { doctor_id, date } = req.body;
    const userId = req.user.id;

    // Chuyển date thành cùng format
    const formattedDate = new Date(date).toISOString().split(".")[0] + "Z";

    // Tạo appointment mới
    const appointment = new appointmentModel({
      patient_id: userId,
      doctor_id,
      date: new Date(date),
      status: "pending",
    });

    await appointment.save(); // Lưu appointment vào database

    // Xóa slot đã chọn khỏi available_slots của doctor
    await doctorModel.findByIdAndUpdate(
      doctor_id,
      { $pull: { available_slots: formattedDate } }, // Format lại trước khi xóa
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await appointmentModel.find({ doctor_id: id });

    res.status(200).json(appointments);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAppointmentsForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy ID của user từ token
    const appointments = await appointmentModel.find({ userId });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
