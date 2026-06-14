import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app=express();
app.use(express.json());
import cookieParser from "cookie-parser"
app.use(cookieParser());

import dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])

import connectDB from "./config/db.js";
connectDB();

import authMiddleware from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
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



app.use("/auth",authRoutes);
app.use("/expense",expenseRoutes);

app.listen(3000);