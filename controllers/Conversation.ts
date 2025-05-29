import { Response, Request } from "express";
import ConversationModel from "../models/Conversation"

 export const Conversation = async(req:Request, res:Response)=>{
   try{
    const newConversation = await ConversationModel.create({
        member:[req.body.senderId, req.body.receiverId]
    })
    if(newConversation){
        res.status(200).send(newConversation)
    }
   }catch(err){
        res.status(500).send(err.message)
   }
 }


 export const GetConversation = async(req:Request, res:Response)=>{
    try{
            const conversation = await ConversationModel.find({
                member:{$in:[req.params.userId]}
            })
            if(conversation)
            res.status(200).send(conversation)    
            }
    catch(err){
            res.status(500).send(err.message)
    }
 }