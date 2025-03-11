import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function audioToText(req, res) {
    try {
        const { audioUrl } = req.body; // Audio file URL (uploaded via frontend)

        // Read the audio file as a Buffer
        const audioBuffer = fs.readFileSync(audioUrl);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent({
            prompt: "Transcribe this audio into text:",
            audio: {
                data: audioBuffer,
                mimeType: "audio/wav", // Change this based on your actual file type
            },
        });

        res.json({ transcript: result.response.text() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
