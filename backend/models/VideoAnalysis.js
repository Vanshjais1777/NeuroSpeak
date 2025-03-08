import mongoose from "mongoose";

const VideoAnalysisSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        videoUrl: { type: String, required: true },
        detectedEmotions: { type: [String] },
        confidenceScore: { type: Number, required: true },
        eyeContact: { type: String },
        improvementSuggestions: { type: [String] },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("VideoAnalysis", VideoAnalysisSchema);
