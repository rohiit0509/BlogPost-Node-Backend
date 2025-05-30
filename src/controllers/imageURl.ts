import {Response, Request} from "express"
import { v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
    cloud_name: 'dyiq2dxud', 
    api_key: '265345753222911', 
    api_secret: 'jZ8brZL2FD-qVENgLyaB_RLdr6Y',
  }); 
 
export const imageURl = async(req:Request, res:Response)=>{
   try{
    const imagePath = req.file.path
   const result = await cloudinary.uploader.upload(imagePath)
   if(result){
    res.send(result.url)
   }
   }catch(err){
    res.send(err)
   }
}