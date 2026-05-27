import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getPendingRecruiters, approveRecruiter, rejectRecruiter } from "../controllers/admin.controller.js";

const router = express.Router();

//Get pending recruiter
router.get("/recruiters/pending", protect, authorizeRoles("admin"), getPendingRecruiters);

//approve recruiter
router.put("/recruiters/:id/approve", protect, authorizeRoles("admin"), approveRecruiter);

//rejected recuiter
router.put("/recruiters/:id/reject", protect, authorizeRoles("admin"), rejectRecruiter);

export default router;