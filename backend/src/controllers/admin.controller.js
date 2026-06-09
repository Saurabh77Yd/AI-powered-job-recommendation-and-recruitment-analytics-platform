import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const getPendingRecruiters = async(req, res)=>{
    try{
        const recruiters = await User.find({
            recruiterStatus:"pending",
        }).select("-password");

        return res.status(200).json({
            message: "Pending recruiters fetched successfully",
            recruiters,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error: error.message
        });
    }
}

//Aprove recuiter
export const approveRecruiter = async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.role = "recruiter";
        user.recruiterStatus = "approved";

        await user.save();
        //notification for recruiter approved 
        await Notification.create({
            user: user._id,
            title:"Recruiter approved",
            message: "Your recruiter account have been approved",
        });

        return res.status(200).json({
            message:"Recruiter approved successfully"
        })
    }catch(error){
        return res.status(500).json({
            message:"Server error",
            error:error.message,
        });
    }
};

export const rejectRecruiter = async(req, res)=>{
    try{
        const user = await user.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message:"User not found",
            });
        }

        user.recruiterStatus="rejected"
        await user.save();

        return res.status(200).json({
            message:"Recruiter rejected"
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    };
}