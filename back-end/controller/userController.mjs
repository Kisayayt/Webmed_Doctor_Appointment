import patientModel from "../models/PatientSchema.mjs";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.user.id);
    if (!patient) {
      return res.status(400).json({ message: "patient profile not found" });
    }

    res.json(patient);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.body);
    const { name, email, phone, age, gender, currentPassword, newPassword } =
      req.body;
    let updateData = { name, email, phone, age, gender };

    if (
      currentPassword &&
      newPassword &&
      currentPassword.trim() !== "" &&
      newPassword.trim() !== ""
    ) {
      const user = await patientModel.findById(userId);

      // So sánh mật khẩu cũ
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      // Mã hóa mật khẩu mới
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await patientModel.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (e) {
    console.log("error");
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};
