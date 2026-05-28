import Job from "../models/Job.js";

//Create Job
export const createJob = async(req, res)=>{
    try{
        const {
            title, 
            description, 
            companyName, 
            location, 
            salary,
            experienceRequired,
            skillsRequired,
            jobType,
            deadline
        } = req.body;
        if(!title || !description || !companyName || !location){
            return res.status(400).json({
                message:"Please fill all required fields"
            })
        }
        const job = await Job.create({
            title,
            description,
            companyName,
            location,
            salary,
            experienceRequired,
            skillsRequired,
            jobType,
            deadline,
            postedBy:req.user._id,
        });
        return res.status(201).json({
            message:"Job created successfully",
            job,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
};
//Get all job
export const getAllJob = async(req,res)=>{
    try{
        const jobs = (await Job.find({isActive:true}).populate("postedBy", "firstName email")).sort({createdAt:-1});
        return res.status(200).json({
            totalJobs:jobs.length,
            jobs,
        });
    }catch(error){
        return res.status(500).json({
            message : "Server Error",
            error : error.message
        });
    }
};
//Get Single Job
export const getSingleJob = async(req, res)=>{
    try{
        const job = await Job.findById(req.params.id).populate(
            "postedBy",
            "firstName email"
        );
        if(!job){
            return res.status(404).json({
                message:"Job not found",
            });
        }

        return res.status(200).json({
            job,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
}
//Getr Recuriter own job
export const getMyJob = async(req, res)=>{
    try{
        const jobs= await Job.find({
            postedBy : req.user._id,
        }).sort({createdAt:-1});
        return res.status(200).json({
            totalJobs:jobs.length,
            jobs,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
}
//Update job
export const updateJob = async(req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({
                message:"Job not found"
            });
        }
        //ownership check
        if(job.postedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Access denied"
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
            }
        );
        return res.status(200).json({
            message:"Job updated succefully",
            job: updatedJob,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server error",
            error:error.message,
        });
    }
};
//Delete Job
export const deleteJob = async(req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({
                message:"Job not found"
            });
        }
        //Ownership check
        if(job.postedBy.toString() !==req.user._id.toString()){
            return res.status(403).json({
                message:"Access denied"
            });
        }
        await job.deleteOne();
        return res.status(200).json({
            message:"Job delete succefully",
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        })
    }
}
