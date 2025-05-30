import { Response, Request } from "express";
import MessageModel from "../models/Message" 

 export const Message = async(req:Request, res:Response)=>{
   try{
    const newMessage = await MessageModel.create(req.body)
    if(newMessage){
        res.status(200).send(newMessage)
    }
   }catch(err){
        res.status(500).send(err.message)
   }
 }


 export const GetMessage = async(req:Request, res:Response)=>{
    try{
            const message = await MessageModel.find({
                conversationId:req.params.conversationId
            })
            if(message)
            res.status(200).send(message)    
            }
    catch(err){
            res.status(500).send(err.message)
    }
 }