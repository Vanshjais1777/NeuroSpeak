export async function analyzeVideo(req, res) {
    try {
        const { imageUrl } = req.body;

        // Process image with AI model (Placeholder)
        const result = {
            emotions: {
                confidence: "80%",
                nervousness: "20%",
                happiness: "50%",
            },
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
