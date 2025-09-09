import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, // user khud set karega
    name: { type: String }, // optional
    password: { type: String, required: true, minlength: 6, select: false } // user khud set karega
  },
  { timestamps: true }
);

// Password hash karne ke liye
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password match karne ke liye method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
