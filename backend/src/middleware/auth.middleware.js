import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async(req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        //if no token
        if(!token){
            return res.status(401).json({
                message:"No authorized, no token"
            })
        }
        //Verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //Get user
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({
                message:"User not found"
            });
        };

        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Not Authorized, please login",
            error:error.message
        });
    }
};