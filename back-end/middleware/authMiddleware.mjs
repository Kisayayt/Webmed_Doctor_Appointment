import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const tokenValue = token.split(" ")[1]; // Lấy token từ "Bearer xxx"

  try {
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified; // Lưu thông tin user từ token
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again" });
    }
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authenticate;
