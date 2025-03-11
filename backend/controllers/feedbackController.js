import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateFeedback(req, res) {
    try {
        const { textAnalysis, faceAnalysis } = req.body;

        const feedbackPrompt = `
        Based on the speech analysis: ${textAnalysis},
        and the facial expression analysis: ${faceAnalysis},
        provide detailed feedback and improvement suggestions.
      `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(feedbackPrompt);
        const feedback = result.response.text();

        res.json({ feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
