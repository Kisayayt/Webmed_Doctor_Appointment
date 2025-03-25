import appointmentModel from "../models/AppointmentSchema.mjs";
import doctorModel from "../models/DoctorSchema.mjs";

export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await appointmentModel
      .find({ doctor_id: doctorId })
      .populate("patient_id", "name email") // Lấy thông tin bệnh nhân
      .sort({ date: 1 });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const acceptAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  console.log("id dei", appointmentId);
  try {
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      status: "in-progress",
    });
    res.json({ success: true, message: "Appointment accepted!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error accepting appointment" });
  }
};

export const finishAppointement = async (req, res) => {
  const { appointmentId } = req.body;
  try {
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      status: "completed",
    });
    res.json({ success: true, message: "Appointment finished!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error finishing appointment" });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    await appointmentModel.findByIdAndDelete(appointmentId);

    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const countDoctors = async (req, res) => {
  try {
    const count = await doctorModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const countPendingAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    console.log(doctorId);

    if (!doctorId) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }

    const count = await appointmentModel.countDocuments({
      doctor_id: doctorId,
      status: "pending",
    });

    console.log(count);

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
