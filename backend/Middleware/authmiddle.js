import jwt from "jsonwebtoken";
import { User } from "../Model/LoginSchema.js";

export const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
