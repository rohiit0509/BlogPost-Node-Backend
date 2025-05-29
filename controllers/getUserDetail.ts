import {Response, Request} from "express"
import User from "../models/user";
export const getUserDetail = async(req:Request, res:Response) => {
  try{
    const userId= req.body.userId;
  const getUser = await User.findOne({_id:userId}, {userName:1})
   if (getUser)
  res.status(200).send(getUser.userName)
  }catch(err){
    res.status(204).send(err.message)
  }

}
