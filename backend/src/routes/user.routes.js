import express from "express";
import {protect} from "../middleware/auth.middleware.js";
import { getUserProfile, updateUserProfile, uploadResume } from "../controllers/user.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/resume", protect, upload.single("resume") ,uploadResume);

export default router;