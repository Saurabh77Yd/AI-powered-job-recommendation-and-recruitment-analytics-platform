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

//User applied job
export const getMyApplications = async(req, res)=>{
    try{
        const applications = await Application.find({
            applicant: req.user._id,
        }).populate("job").sort({createdAt:-1});

        return res.status(200).json({
            totalApplications : applications.length,
            applications,
        });
    }catch(error){
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

//RECRUITER VIEW  APPLICANT
export const getJobApplicants = async(req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({
                message:"Job not found"
            });
        }
        //Ownership check
        if(Job.postedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Access denied",
            });
        }

        const applicants = await Application.find({
            job:req.params.jobId
        }).populate("applicant", "firstName lastName email profile resume").sort({createdAt:-1});

        return res.status(200).json({
            totalApplicants : applicants.length,
            applicants,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
};

//Update Appliocation Status 
export const updateApplicationsStatus = async(req, res) =>{
    try{
        const {status} = req.body;
        const application = await Application.findById(req.params.id).populate("job");

        if(!application){
            return res.status(404).json({
                message:"Application not found",
            });
        }
        //Recruiter ownership check
        if(application.job.postedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Access Denied",
            });
        }

        application.status = status;
        await application.save();

        return res.status(200).json({
            message:"Application status updated",
            application
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
};