import { Router } from "express";
const router = Router();
import { signup, login, getUserProfile } from "../controllers/authController";
import { audioToText } from "../controllers/audioContoller";
import { analyzeText } from "../controllers/analysisController";
import { analyzeVideo } from "../controllers/videoController";
import { generateFeedback } from "../controllers/feedbackController";
import { saveProgress, getUserProgress } from "../controllers/progressContoller";

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", getUserProfile);

router.post("/audio-to-text", audioToText);
router.post("/analyze-text", analyzeText);
router.post("/analyze-Video", analyzeVideo);
router.post("/generate-feedback", generateFeedback);
router.post("/save-progress", saveProgress);
router.get("/get-progress", getUserProgress);

export default router;
