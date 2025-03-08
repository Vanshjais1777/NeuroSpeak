import { Schema, model } from "mongoose";

const TextAnalysisSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        inputText: { type: String, required: true },
        sentiment: { type: String }, // E.g., "Positive", "Negative", "Neutral"
        grammarScore: { type: Number, required: true }, // 0-100
        clarityScore: { type: Number, required: true },
        confidenceLevel: { type: String }, // "High", "Medium", "Low"
        improvementSuggestions: { type: [String] },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default model("TextAnalysis", TextAnalysisSchema);
