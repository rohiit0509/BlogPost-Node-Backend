import { Request, Response } from "express"
export const Authorize =(req:Request, res:Response)=>{
       res.status(200).send(true)
}