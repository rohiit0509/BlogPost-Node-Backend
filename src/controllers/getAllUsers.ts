import {Response, Request} from "express"
import User from "../models/user";
export const GetAllUsers = async(req:Request, res:Response)=>{
    const loggedInUser = req.body.userId;
   try{
        const getAllUser = await User.find({},{userName:1, userProfile:1})
        if(getAllUser){
            res.status(200).send({getAllUser,loggedInUser })
        }
   }
   catch(err){
    res.status(204).send(err.message)
   }
}