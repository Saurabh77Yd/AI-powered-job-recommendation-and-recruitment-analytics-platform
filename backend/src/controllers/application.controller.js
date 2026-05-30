import Application from "../models/Application.js";
import Job from "../models/Job.js";

//Apply job
export const applyToJob = async(req, res)=>{
    try{
        const {coverLetter} = req.body;
        const job = await Job.findById(req.params.jobId);
        if(!job){
            return res.status(404).json({
                message : "Job not found",
            });
        }
        //prevent dublicate applied
        const alreadyApplied = await Application.findOne({
            applicant : req.user._id,
            job : job._id,
        });
        if(alreadyApplied){
            return res.status(400).json({
                message:"You alredu applied to this job",
            });
        }

        const application = await Application.create({
            applicant: req.user._id,
            recruiter: job.postedBy,
            job: job._id,
            coverLetter,
        });

        return res.status(201).json({
            message:"Job applied successsfully",
            application,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
};