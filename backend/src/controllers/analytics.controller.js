import { getAdminAnalytics, getRecruiterAnalytics } from "../services/analytics.service.js";

export const adminAnalytics = async(req, res)=>{
    try{
        const data = await getAdminAnalytics();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

export const recruiterAnalytics = async(req, res)=>{
    try{
        const data = await getRecruiterAnalytics(req.user._id);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};