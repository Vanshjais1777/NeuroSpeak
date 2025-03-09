import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        speechScores: [{ fluency: Number, grammar: Number, date: Date }], // Historical scores
        textScores: [{ clarity: Number, confidence: Number, date: Date }],
        facialScores: [{ confidence: Number, eyeContact: String, date: Date }],
        overallProgress: { type: String }, // "Improving", "Needs Work", "Excellent"
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Progress = mongoose.model("Progress", ProgressSchema);

export default Progress;
