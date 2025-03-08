import { post } from "axios";

export async function audioToText(req, res) {
    try {
        const { audioUrl } = req.body; // Audio file URL (uploaded via frontend)

        const response = await post(
            "https://api.openai.com/v1/audio/transcriptions",
            { file: audioUrl, model: "whisper-1" },
            { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
        );

        res.json({ transcript: response.data.text });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
