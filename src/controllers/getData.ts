import {Response, Request} from "express"
import getDataModel from "../src/models/getData"
import { v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
   cloud_name: 'dyiq2dxud', 
   api_key: '265345753222911', 
   api_secret: 'jZ8brZL2FD-qVENgLyaB_RLdr6Y',
 }); 

export const getData = async(req:Request, res:Response)=>{
   try{
   const body = req.body;
   const imagePath = req.file.path
   const result = await cloudinary.uploader.upload(imagePath)
   if(result){
      let save = await getDataModel.create({
         userId:body.userId,
         title:body.title,
         description:body.description,
         thumbnail:result.url,
         body:body.body,
         likes:[],
         comments:[],
      });

      if(save){
         res.status(200).send({msg:"Blog is created"})
      }
      else
      res.status(204).send({msg:"Blog is not created"})
   }
   }
   catch(err){
      res.send(err.message)
   }
   
}