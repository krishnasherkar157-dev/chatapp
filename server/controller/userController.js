import cloudinary from "../lib/cloudinary";
import { generateToken } from "../lib/utils";
import User from "../models/user";

//signup a new user
export const signup = async ()=>{
    const { fullName, email,password, bio } = req.body;


    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success:false, message:"Missing Details"})
        }
        const user =await User.findOne({email});
        if(usert){
            return res.json({success:false, message:"Account already exist"})

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        const newUser = await User.create({
            fullName,email,password:hashedPassword,bio
        });
        //genrate the token
        const token = generateToken(newUser._id);
        //send the response
        res.json({
            success: true,
            userData: newUser,
            token,
            message:"acccount created successfully"
        })

    }catch(error){
        console.log(error.message);
        res.json({success:false, message: error.message})

    }
}
// conroller to login a user

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const userData = await User.findOne({email})

        const isPasswordCorrect = await bcrypt.compare(password,userData.password);
        if(!isPasswordCorrect){
            return res.json({success:false, message:"Invalid credentials"});
        }


        const token = generateToken(userData._id)
        res.json({success: true,userData,token,message:"login successful"})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.messsage})
    }
}
//controller to check if user is authenticated

export const checkAuth = (res,req)=>{
    res.json({success:true, user:req.user});
}

//controller to update user profile detail

export const updateprofile = async(req,res)=>{
    try{
        const{profilePic,bio,fullName}=req.body;
        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId,{bio,fullName},
            {new:true});
        }else{
            const upload =await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId,{profilePic: upload.secure_url, bio, fullName},{new:true});
        }
        res.json({success:true,user:updatedUser})
    }catch(error){
        res.json({ success: false, message: error.message });
    }
    
}

