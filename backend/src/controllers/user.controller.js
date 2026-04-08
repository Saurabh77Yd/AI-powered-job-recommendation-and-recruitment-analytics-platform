import User from "../models/User.js";

//Get login user profile
export const getUserProfile = async(req,res)=>{
    try{
        const user =await User.findById(req.user._id).select("-password");

        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }
        return res.status(200).json({
            message:"User profile fetch Successfully",
            user
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
};

export const updateUserProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                message:"User not found",
            });
        }

        const {firstName, lastName, profile, resume} = req.body;

        if(firstName) user.firstName=firstName;
        if(lastName) user.lastName=lastName;
        if(profile) {
            user.profile = {
                ...user.profile,
                ...profile
            }
        }
        if (resume?.url) {
            if (!user.resume) {
                user.resume = {};
            }
            user.resume.url = resume.url;
        }

        if(req.body.password || req.body.role || req.body.email){
            return res.status(400).json({
                message:"You can not update restricted field"
            });
        }

        if(resume?.parsedData){
            delete req.body.resume.parsedData;
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            message:"Profile update succefully",
            user:updatedUser,
        });

    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
};