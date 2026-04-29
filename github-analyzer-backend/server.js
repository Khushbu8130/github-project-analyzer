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

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", analyzeRoute);
app.use("/api/auth", authRoute);

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});