import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim : true,
        },
        description:{
            type: String,
            required : true
        },
        comapanyName:{
            type: String,
            required : true,
        },
        location:{
            type:String,
            required:true,
        },
        salary:{
            type:Number,
        },
        experienceRequired:{
            type:Number,
            default:0,
        },
        skillRequired:[
            {
                type:String
            },
        ],
        jobType:{
            type:String,
            enum:["Full-Time", "Part-Time", "Internship", "Contract"],
            default:"Full-Time",
        },
        deadline:{
            type:Date,
        },
        isActive:{
            type:Boolean,
            default:true,
        },
        postedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    },
    {
        timestamps:true,
    }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;