import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        applicant : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        job:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job",
            required:true,
        },
        recruiter:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        status:{
            type : String,
            enum : ["pending", "shortlisted", "rejected", "hired"],
            default : "pending",
        },
        coverLetter : {
            type:String
        },
        appliedAt:{
            type:Date,
            default : Date.now,
        },
    },
    {
        timestamps: true
    }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
