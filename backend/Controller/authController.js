import { User } from "../Model/User-Register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Register User



export const registerUser = async (req, res) => {
  try {
    const { userId, name, password, duration } = req.body;

    if (!userId || !password || !duration) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    // expiryDate = abhi + duration days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + Number(duration));

    const newUser = new User({
      userId,
      name,
      password,
      expiryDate,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });

    if (!user) return res.status(400).json({ message: "User not found ❌" });

    // Check expiry
    if (new Date() > new Date(user.expiryDate)) {
      return res.status(403).json({ message: "Account expired ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials ❌" });

    res.status(200).json({ message: "Login successful ✅", token: "dummy-token" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};



// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password hide
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, expiryDate } = req.body;

    // prepare update object
    let updateData = { name, expiryDate };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // return updated user
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found ❌" });

    res.status(200).json({ message: "User updated successfully ✅", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌", error: err.message });
  }
};



export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};