import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import analyzeRoute from "./routes/analyzeRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware (FIXED CORS)
app.use(cors({
  origin: process.env.FRONTEND_URL, // 👈 important
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api", analyzeRoute);
app.use("/api/auth", authRoute);

// ✅ Test route (VERY IMPORTANT for Render check)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});