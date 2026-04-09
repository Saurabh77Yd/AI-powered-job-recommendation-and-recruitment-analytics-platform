//Upload to cloudinary
import cloudinary from "../config/cloudinary.js";

export const uploadResumeToCloudinary = async(fileBuffer)=>{
    return new Promise((resolve, reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {
                folder:"resumes",
                resource_type:"raw",
            },
            (error, result)=>{
                if(error) return reject(error);
                resolve(result)
            }
        );
        stream.end(fileBuffer)
    });
};
//Dummy parser
export const parseResume = async(fileUrl)=>{
    return{
        skills:["React", "Node"],
        experience:1,
        education:"B.Tech"
    }
}