import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        sessionType: { type: String, enum: ["Speech", "Text", "Facial"], required: true },
        feedbackText: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true }, // User rates AI feedback
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
