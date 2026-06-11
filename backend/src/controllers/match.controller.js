import User from "../models/User.js";
import Job from "../models/Job.js";
import { calculateMatch } from "../services/match.service.js";

export const getJobMatch = async(req, res)=>{
    try{
        const user = await User.findById(req.user._id);
        const job = await Job.findById(req.params.jobId);

        if(!job){
            return res.status(404).json({
                message:"Job not found",
            });
        }

        const userSkills = user.resume?.parsedData?.skills?.length > 0 ? user.resume.parsedData.skills : user.profile?.skills || [];

        const result = calculateMatch(userSkills, job.skillRequired);
        return res.status(200).json({
            jobId: job._id,
            jobTitle: job.title,
            matchPercentage: result.matchPercentage,
            matchedSkills: result.matchedSkills,
            missingSkills: result.missingSkills,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
};

//Recommeded job
export const getRecommendedJobs = async(req, res)=>{
    try{
        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }
        // Prefer AI parsed skills, fallback to profile skills
        const userSkills = user.resume?.parsedData?.skills?.length > 0 ? user.resume.parsedData.skills : user.profile?.skills || [];

        const jobs = await Job.find({
            isActive:true
        });
        
        const recommendations = jobs.map((job)=>{
            const result = calculateMatch(userSkills, job.skillRequired);
            return {
                job,
                matchPercentage: result.matchPercentage,
                matchedSkills : result.matchedSkills,
                missingSkills : result.missingSkills,
            };
        });

        recommendations.sort((a,b)=>b.matchPercentage-a.matchPercentage);

        return res.status(200).json({
            totalJobs: recommendations.length,
            recommendations
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
};