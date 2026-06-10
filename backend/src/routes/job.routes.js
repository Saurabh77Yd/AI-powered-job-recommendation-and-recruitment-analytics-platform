import express, { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { createJob, getAllJob, getSingleJob, getMyJob, updateJob, deleteJob, saveJob, getSavedJobs, removeSavedJob} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getAllJob);
router.get("/:id", getSingleJob);
router.post("/", protect, authorizeRoles("recruiter"), createJob);
router.get("/my/jobs", protect, authorizeRoles("recruiter", getMyJob));
router.put("/:id", protect, authorizeRoles("recruiter"), updateJob);
router.delete("/:id", protect, authorizeRoles("recruiter"), deleteJob);
//saved (bookmark) related routes
router.post("/:id/save", protect, saveJob);
router.get("/saved", protect, getSavedJobs);
router.delete("/:id/save", protect, removeSavedJob);

export default router;