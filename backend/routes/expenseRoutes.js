import expense from "../models/expense.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router();

router.post("/add",authMiddleware,async(req,res)=>{
    
    try{ 
    const type=req.body.type;
    const category=req.body.category;
    const note=req.body.note;
    const amount=req.body.amount;
    const date=req.body.date;
    const userId=req.user.userId;
    const newE=new expense({
        userId,
        type,
        category,
        note,
        amount,
        date
    })
    await newE.save();
    res.json({
        msg:"success"
    })}
    catch(err){
        console.log(err);
        res.status(500).json({
            msg:"something went wrong"
        })
    }
})

router.get("/getData",authMiddleware,async(req,res)=>{
    try{ 
    const userId=req.user.userId;
    const userData=await expense.find(
        {userId:userId}
    );
    res.send(userData);
}
catch(err){
        console.log(err);
        res.status(500).json({
            msg:"something went wrong"
        })
    }
})

router.put("/edit",authMiddleware,async(req,res)=>{
    try{ 
    const type=req.body.type;
    const category=req.body.category;
    const note=req.body.note;
    const amount=req.body.amount;
    const date=req.body.date;
    const expenseId=req.body.expenseId;
    const userData=await expense.findOneAndUpdate(
        {_id:expenseId},
        {$set:{
            type,
            category,
            note,
            amount,
            date
        }},
        {returnDocument: 'after'}
    );
    if(!userData){
        res.json({
            msg:"expense not found"
        })
    }
    res.json({
        msg:"success"
    })
}
catch(err){
        console.log(err);
        res.status(500).json({
            msg:"something went wrong"
        })
    }
})

router.delete("/delete",authMiddleware,async(req,res)=>{
    try{
    const  expenseId=req.body.expenseId;
    await expense.findByIdAndDelete(expenseId);
    res.json({
        msg:"success"
    })
}
catch(err){
        console.log(err);
        res.status(500).json({
            msg:"something went wrong"
        })
    }
})

export default router;