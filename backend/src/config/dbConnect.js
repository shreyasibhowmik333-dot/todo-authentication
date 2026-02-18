import mongoose from "mongoose";
import dotenv from "dotenv/config"

export async function dbConnect(){
    try {
        await mongoose.connect(process.env.URL)
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("MongoDB not connected", error);
        
    }
}