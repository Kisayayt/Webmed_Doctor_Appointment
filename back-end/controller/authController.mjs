// import UserModel from "../models/UserSchema.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import patientModel from "../models/PatientSchema.mjs";
import multer from "multer";
import doctorModel from "../models/DoctorSchema.mjs";

const storage = multer.diskStorage({
  destination: "./uploads/", // Thư mục lưu ảnh
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
export const register = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password, phone, gender, age } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : null;

    // Kiểm tra nếu thiếu password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // let usernameExist = await UserModel.findOne({ username });

    let emailExist = await patientModel.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "email is already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new patientModel({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      age,
      avatar,
    });

    await user.save();
    res.status(201).json({ message: "patient created successfully", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

export const uploadAvatar = upload.single("avatar");

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await patientModel.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ id: decoded.id, role: decoded.role });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const RegisterForDoctor = async (req, res) => {
  try {
    console.log("Im here", req.body);

    const { name, email, password, phone, gender, age, specialty, experience } =
      req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : null;

    const experienceNumber = parseInt(experience, 10);
    const ageNumber = parseInt(age, 10);

    // Kiểm tra nếu thiếu password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // let usernameExist = await UserModel.findOne({ username });

    let emailExist = await doctorModel.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "email is already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new doctorModel({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      age: ageNumber,
      specialty,
      experience: experienceNumber,
      avatar,
      available_slots: [],
      appointments: [],
    });

    console.log(user);

    await user.save();
    res.status(201).json({ message: "Doctor created successfully", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
