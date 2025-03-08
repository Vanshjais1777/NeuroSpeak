import Progress, { find } from "../models/Progress";

export async function saveProgress(req, res) {
    try {
        const { userId, speechAnalysis, faceAnalysis, feedback } = req.body;

        const newProgress = new Progress({
            userId,
            speechAnalysis,
            faceAnalysis,
            feedback,
            createdAt: new Date(),
        });

        await newProgress.save();
        res.status(201).json({ message: "Progress saved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserProgress(req, res) {
    try {
        const progress = await find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
