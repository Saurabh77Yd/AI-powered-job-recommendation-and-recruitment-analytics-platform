//Upload to cloudinary
import cloudinary from "../config/cloudinary.js";
import pdf from "pdf-parse";
import genAI from "../config/gemini.js";

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
//Resume parser
export const parseResume = async(fileBuffer)=>{
    const pdfData = await pdf(fileBuffer);
    const resumeText = pdfData.text;

    const model =  genAI.getGenerativeModel({
        model:"gemini-2.0-flash"
    });

    const prompt = `Extarct infromation from this resmue. 
                    Return only valid JSON:
                    {
                        "skills":[],
                        "experience":0,
                        "education":""
                    }
                    Resume:${resumeText}`;
    const result = await model.generateContent(prompt);

    const response = result.response.text();
    return JSON.parse(
        response.replace(/```JSON|```/g, "")
    );
};