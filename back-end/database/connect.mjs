import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Tăng thời gian timeout lên 15 giây
    });
    console.log("✅ Kết nối MongoDB thành công!");
    return true;
  } catch (err) {
    console.error("❌ Kết nối MongoDB thất bại:", err.message);
    return false;
  }
};

// Đảm bảo kết nối hoàn thành trước khi export
export default connect;
