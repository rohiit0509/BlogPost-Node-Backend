import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.MONGO_URI as string;

mongoose.connect(mongoURI).then(()=>console.log("Mongodb connected")).catch(()=>console.log("Error in connection db"))