import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import multer from "multer";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// AssemblyAI API Key
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 🔹 Function to Upload Audio to AssemblyAI
async function uploadAudioFile(filePath) {
    try {
        const fileData = fs.readFileSync(filePath);
        const response = await axios.post("https://api.assemblyai.com/v2/upload", fileData, {
            headers: {
                authorization: ASSEMBLYAI_API_KEY,
                "content-type": "application/octet-stream"
            }
        });
        return response.data.upload_url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload audio file");
    }
}

// 🔹 Function to Request Transcription
async function requestTranscription(audioUrl) {
    try {
        const response = await axios.post("https://api.assemblyai.com/v2/transcript", { audio_url: audioUrl }, {
            headers: { authorization: ASSEMBLYAI_API_KEY }
        });
        return response.data.id;
    } catch (error) {
        console.error("Error requesting transcription:", error);
        throw new Error("Failed to request transcription");
    }
}

// 🔹 Function to Check Transcription Status
async function getTranscriptionResult(transcriptId) {
    const url = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
    while (true) {
        const response = await axios.get(url, {
            headers: { authorization: ASSEMBLYAI_API_KEY }
        });

        console.log("Current Status:", response.data.status);

        if (response.data.status === "completed") {
            return response.data.text;
        } else if (response.data.status === "failed") {
            throw new Error("Transcription failed");
        }

        // Wait before checking again
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// 🔹 Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// 🔹 Handle Audio Upload & Processing
export async function audioToText(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No audio file uploaded" });
        }

        const audioPath = req.file.path;
        console.log("Uploaded file path:", audioPath);

        // 🔹 Step 1: Upload to AssemblyAI
        const uploadUrl = await uploadAudioFile(audioPath);
        console.log("Upload URL:", uploadUrl);

        // 🔹 Step 2: Request Transcription
        const transcriptId = await requestTranscription(uploadUrl);
        console.log("Transcript ID:", transcriptId);

        // 🔹 Step 3: Wait for Transcription Completion
        const transcription = await getTranscriptionResult(transcriptId);
        console.log("Final Transcription:", transcription);

        // 🔹 Step 4: Analyze Sentiment & Grammar Using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze the following speech:
        Text: "${transcription}"
        Provide:
        1. Sentiment analysis (fear, confidence, nervousness) in JSON format.
        2. Grammar mistakes in JSON format.
        
        The response format should be a valid json (don't include `+ " ```json and ```" + `):
        {
            "sentiments": {
                "fear": 0.1,
                "confidence": 0.5,
                "nervousness": 0.4
            },
            "grammar": "Your message here"
        }`;
        const response = await model.generateContent(prompt);
        let result = response.response.text();

        console.log(result);
        res.json({ transcription, analysis: JSON.parse(response.response.text()) });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
}

// 🔹 Export Middleware for File Upload
export const uploadAudio = upload.single("audio");
