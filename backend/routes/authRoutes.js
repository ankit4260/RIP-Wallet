import user from "../models/user.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router();

import jwt from "jsonwebtoken";
const JWT_SECRET=process.env.JWT_SECRET

router.post("/register",async(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    try{
    const existingUser=await user.findOne({
        $or:[
        {username},
        {email}
        ]
    })
    if(existingUser){
        res.json({
            msg: "user already exists"
        })
    }
    else{
            const u=new user({
                username:username,
                email:email,
                password:password
            })
            await u.save();
            res.json({
                msg:"success"
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            msg:err
        })
    }
})

router.post("/login",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    try {
    const existingUser= await user.findOne({
        username,
        password
    })
    if(existingUser){
        
        const token = jwt.sign(
    { userId: existingUser._id },
    process.env.JWT_SECRET  
    );

res.cookie("token",token,{httpOnly:true}).json({msg:"success"});
                
    }
    else{
        res.json({
            msg:"user account not found"
        })
    }
    }
    catch(err){
        console.log(err);
        res.json({
            msg:err
        })
    }
})

router.get("/me",authMiddleware,async(req,res)=>{
    const userId=req.user.userId;
    const userData=await user.findById(userId);
    res.send(userData)
})

router.get("/signOut",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/")
})

export default router;