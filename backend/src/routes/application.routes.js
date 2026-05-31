import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { applyToJob,getMyApplications, getJobApplicants, updateApplicationsStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/:jobId/apply", protect, authorizeRoles("user"), applyToJob); //job apply
router.get("/my", protect, authorizeRoles("user"), getMyApplications); //View job aply
router.get("/job/:jobId", protect, authorizeRoles("recruiter"), getJobApplicants);
router.put("/:id/status", protect, authorizeRoles("recruiter"), updateApplicationsStatus  );

export default router;
