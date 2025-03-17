import { Router } from "express";
const router = Router();
import { signup, login, getUserProfile,deleteUserProfile ,createUserProfile ,updateUserProfile  } from "../controllers/authController.js";
import { audioToText,uploadAudio } from "../controllers/audioContoller.js";
import { analyzeText } from "../controllers/analysisController.js";
// import { analyzeVideo } from "../controllers/videoController.js";
import { generateFeedback } from "../controllers/feedbackController.js";
import { saveProgress, getUserProgress } from "../controllers/progressContoller.js";

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", getUserProfile);
router.delete("/profile", deleteUserProfile);
router.post("/profile", createUserProfile);
router.put("/profile", updateUserProfile);

router.post("/audio-to-text", uploadAudio, audioToText);
router.post("/analyze-text", analyzeText);
// router.post("/analyze-Video", analyzeVideo);
router.post("/generate-feedback", generateFeedback);
router.post("/save-progress", saveProgress);
router.get("/get-progress", getUserProgress);

export default router;
