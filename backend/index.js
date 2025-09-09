import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import authRoutes from "./Route/authRoute.js";
import adminauthroute from "./Route/AdminRoute.js";
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());



app.use(cors({
  origin: [
    "https://niitpractice.technoesgroup.com",
    "http://localhost:5173"
  ],
  credentials: true,  // agar cookies ya auth headers bhejne hain
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth",adminauthroute);

app.get("/", (req, res) => {
  res.send("Auth API Running...");
});


const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
