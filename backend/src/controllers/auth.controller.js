import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;
        if(!firstName){ 
            return res.status(400).json({ message:"First Name is required" });
        }else if(!email){
            return res.status(400).json({ message:"Email is required" });
        }else if(!password){
            return res.status(400).json({ message:"Password is required" });
        }

        //Password verification:
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({
                message:"Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character"
            })
        }
        const emailLower = email.toLowerCase();
        //Check existing user
        const existingUser = await User.findOne({email : emailLower});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //save user
        const user = await User.create({
            firstName,
            lastName,
            email: emailLower,
            password:hashPassword
        });

        //Response
        return res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });

    }catch(error){
        return res.status(500).json({
            message : "Server Error",
            error:error.message
        });
    }
}

export const loginUser = async(req, res) =>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message:"Email and Password are required"});
        }
        const emailLower = email.toLowerCase();

        //Find user
        const user = await User.findOne({email:emailLower});
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        //compaire password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        //Genrate token
        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: "3d"}
        )

        return res.status(200).json({
            message:"Login Succefully",
            token,
            user:{
                id:user._id,
                firstName:user.firstName,
                email:user.email,
                role:user.role
            }
        })
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
}