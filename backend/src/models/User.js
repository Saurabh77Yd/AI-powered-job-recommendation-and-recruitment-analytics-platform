import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    //Role 
    role:{
        type:String,
        enum:["user","recruiter","admin"],
        default:"user"
    },
    //user profile (job seeker)
    profile:{
        experience:{
            type:Number,
            default:0
        },
        education:{
            type:String
        },
        location:{
            type:String
        },
        skills:[{
            type:String
        }],
        achievements:[{
            type:String
        }],
        projects:[
            {
                title:String,
                description:String,
                link:String
            }
        ]
    },
    //RECRUITER PROFILE
    recruiterProfile:{
        companyName:String,
        companyWebsite:String,
        position:String,
        companyId:String,
        description:String
    },
    //RECRUITER STATUS
    recruiterStatus:{
        type:String,
        enum:["none","pending","approved","rejected"],
        default:"none"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    //Resume
    resume:{
        url:String,
        parsedData: {
            skills: [String],
            experience: Number,
            education: String
        }
    },
    //Activity Tracking
    lastActive:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
}
);

const User = mongoose.model("User", userSchema);
export default User;