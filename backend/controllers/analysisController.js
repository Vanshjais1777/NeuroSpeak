import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeText(req, res) {
    try {
        const { text } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(`Analyze this speech for grammar, confidence, and tone: ${text}`);

        res.json({ analysis: result.response.text() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
