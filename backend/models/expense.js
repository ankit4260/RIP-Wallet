import mongoose from "mongoose";
const expenseSchema=new mongoose.Schema({
    userId:String,
    type:String,
    category:String,
    note:String,
    amount:Number,
    date:Date
},
{
    timestamps:true
}
)

const expense=mongoose.model("expense",expenseSchema);

export default expense;