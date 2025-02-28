import bcrypt from "bcrypt";
import users from "../model/user.model.js"
import { generateToken } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";
export const  signup=async(req,res)=>{
    try {
    const {fullname,email,password,profilepic,phone}=req.body;
    if(password.length<6)
    {
        return res.status(400).json({"message":"Password must be at least 6 charcters"});
    
    }
    const user=await users.findOne({email:email});
    if(user)
    {
        return res.status(400).json({message:"email already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    

    const newUser=new users({

        fullname,
        email,
        phone,
        password:hashedPassword
        });
        if(newUser)
        {
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                phone:newUser.phone,
                profilepic:newUser.profilepic
            })
        }
        else{
            res.status(400).json({"message":"invalid user data"});
        }

        } catch (error) {
            console.log("error in signing up controller "+error.message);
            res.status(500).json({"message":error.message});
        
          }

}
export  const login= async(req,res)=>{
   try{
            const {email,password}=req.body;
            const user= await users.findOne({email:email});
            if(!user)
            {
                return res.status(400).json({"message":"invalid cridentials"});
            }
            const  isPassword= await bcrypt.compare(password,user.password);
            if(!isPassword)
            {
                return res.status(400).json({"message":"invalid credentials"});
            }

          const token=generateToken(user._id,res);
            return res.status(200).json({
                _id:user._id,
                emai:user.email,
                fullname:user.fullname,
                phone:user.phone
            })


   }catch(err)
   {
    console.log({"message":err.message});
    res.status(500).json({"message":"internal error"});

   }
}
export const logout=(req,res)=>{
    try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({"message":"Logged out Successfully"});
    }catch(err)
    {
        console.log("error in logout controller", err.messa);
        res.status(500).json({"message":"internal error"});

    }


}
export const updateProfile= async (req,res)=>{
    try {
        const {profilepic}=req.body;
        const userId=req.user._id;
        if(!profilepic)
        {
            return res.status(404).json({"message":"profile picture is required"});
        }
      const uploadResponse= await cloudinary.uploader.upload(profilepic);
        const updateUser=await users.findByIdAndUpdate(userId,{profilepic:uploadResponse.secure_url},{new:true})
    } catch (error) {
        console.log("error",err.message);
        res.status(500).json({"message":"Internal server error"});
    }

    
}

export const checkAuth= (req,res)=>
{
        try {
            res.status(200).json(req.user);
            
        } catch (error) {
            console.log("error in checkAuth controller",error.message);
            res.status(500).json({message:"internal Server Erro"});
            
        }
}


