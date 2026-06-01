import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { adminAnalytics, recruiterAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/admin", protect, authorizeRoles("admin"), adminAnalytics);
router.get("/recruiter", protect, authorizeRoles("recruiter"), recruiterAnalytics );

export default router;