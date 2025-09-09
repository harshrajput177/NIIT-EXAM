import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // 🔹 Cleanup: drop unwanted email index if exists
    const User = mongoose.connection.collection("users");
    const indexes = await User.indexes();

    if (indexes.some(idx => idx.name === "email_1")) {
      await User.dropIndex("email_1");
      console.log("🗑️ Removed duplicate email index");
    }
  } catch (err) {
    console.error("❌ DB Connection Failed", err.message);
    process.exit(1);
  }
};
