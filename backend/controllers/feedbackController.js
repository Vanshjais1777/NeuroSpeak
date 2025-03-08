export async function generateFeedback(req, res) {
    try {
        const { textAnalysis, faceAnalysis } = req.body;

        const feedbackPrompt = `
        Based on the speech analysis: ${textAnalysis},
        and the facial expression analysis: ${faceAnalysis},
        provide detailed feedback and improvement suggestions.
      `;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: feedbackPrompt }],
            },
            { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
        );

        res.json({ feedback: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
