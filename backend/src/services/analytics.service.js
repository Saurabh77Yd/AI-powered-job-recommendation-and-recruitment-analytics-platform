import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getAdminAnalytics = async() =>{
    const totalUsers = await User.countDocuments({
        role:"user",
    });

    const totalRecruiters =  await User.countDocuments({
        role:"recruiter",
    });

    const totalJob = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    return{
        totalUsers,
        totalRecruiters,
        totalJob,
        totalApplications
    };
};

export const getRecruiterAnalytics = async(recruiterId)=>{
    const jobPosted = await Job.countDocuments({
        postedBy: recruiterId,
    });

    const recruiterJobs = await Job.find({
        postedBy: recruiterId,
    }).sort("_id");

    const jobIds = recruiterJobs.map(
        (job)=>job._id
    );

    const applicationReceived = await Application.countDocuments({
        job: {$in: jobIds}, 
    });

    const sortlisted = await Application.countDocuments({
        job: { $in: jobIds},
        status: "shortlisted",
    });

    const hired = await Application.countDocuments({
        job: { $in: jobIds},
        status: "hired",
    });

    return{
        jobsPosted,
        applicationReceived,
        shortlisted,
        hired
    };
};