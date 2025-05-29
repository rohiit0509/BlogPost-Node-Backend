import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/userData").then(()=>console.log("Mongodb connected")).catch(()=>console.log("Error in connection db"))