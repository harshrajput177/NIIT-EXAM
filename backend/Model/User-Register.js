import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    password: { type: String, required: true, minlength: 6 },
    expiryDate: { type: Date, required: true }, // 👈 new field
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);

