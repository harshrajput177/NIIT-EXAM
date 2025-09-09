import express from "express";
import { 
  deleteUser, 
  getAllUsers, 
  loginUser, 
  registerUser, 
  updateUser  // 👈 New
} from "../Controller/authController.js";

const router = express.Router();

router.post("/register", registerUser);   // Create
router.get("/users", getAllUsers);        // Read
router.post("/login", loginUser);         // Login
router.put("/users/:id", updateUser);     // 👈 Update (Edit user)
router.delete("/users/:id", deleteUser);  // Delete

export default router;
