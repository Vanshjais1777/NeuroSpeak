export async function analyzeVideo(req, res) {
    try {
        const { videoUrl } = req.body;
        // Call the video analysis API
        res.json({ message: "Video analysis completed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}