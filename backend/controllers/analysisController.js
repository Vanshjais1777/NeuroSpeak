import axios from "axios";


export async function analyzeText(req, res) {
    try {
        const { text } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: `Analyze this speech for grammar, confidence, and tone: ${text}` }],
            },
            { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
        );

        res.json({ analysis: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




