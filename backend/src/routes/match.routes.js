import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getJobMatch, getRecommendedJobs } from "../controllers/match.controller.js";

const router = express.Router();

router.get("/jobs", protect, getRecommendedJobs);
router.get("/job/:jobId", protect, getJobMatch);

export default router;