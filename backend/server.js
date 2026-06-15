import express from "express";
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import cookieParser from "cookie-parser";
import dns from 'node:dns';
import connectDB from "./config/db.js";
dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());


dns.setServers(['8.8.8.8', '1.1.1.1'])


connectDB();

app.use("/auth",authRoutes);
app.use("/expense",expenseRoutes);


const __dirname=path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname,"../frontend")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/signup.html"));
})

app.get("/dashboard",authMiddleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dashboard.html"));
})

app.get("/manage",authMiddleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/manage.html"));
})



app.listen(process.env.PORT || 3000);