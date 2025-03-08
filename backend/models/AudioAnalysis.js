import mongoose from "mongoose";

const AudioAnalysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    audioUrl: { type: String, required: true },
    transcript: { type: String, required: true },
    fluencyScore: { type: Number, required: true },
    grammarScore: { type: Number, required: true },
    toneAnalysis: { type: String },
    improvementSuggestions: { type: [String] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AudioAnalysis", AudioAnalysisSchema);
