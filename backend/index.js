import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/routes.js";
import faceapi from 'face-api.js';
import path from 'path';
import { fileURLToPath } from "url";


// Serve model files statically

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname issue
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use("/models", express.static(path.join(__dirname, "aiModel")));
app.use(express.urlencoded({extended:true}));
app.use(json());
app.use(cors());

// Connect to MongoDB
connect(process.env.MONGO_URI, {})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// async function loadModels() {
//     await faceapi.nets.tinyFaceDetector.loadFromUri('http://localhost:4000/models');
//     await faceapi.nets.faceLandmark68Net.loadFromUri('http://localhost:4000/models');
//     // await faceapi.nets.faceRecognitionNet.loadFromUri('/aiModel'); // Optional
//     await faceapi.nets.faceExpressionNet.loadFromUri('http://localhost:4000/models'); // Required for emotions

//     console.log("Models Loaded Successfully!");
// }
// loadModels();

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