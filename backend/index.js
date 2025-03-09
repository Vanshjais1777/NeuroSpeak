import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/routes.js";

config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(json());
app.use(cors());

// Connect to MongoDB
connect(process.env.MONGO_URI, {})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", apiRoutes);

// Root Endpoint
app.get("/", (req, res) => {
    res.send("🎙️ NeuroSpeak Backend is Running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});