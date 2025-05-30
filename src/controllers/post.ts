import PostModel from "../models/post";
import { Request, Response } from "express";

export const CreatePost = async (req: any, res: Response) => {
  const { title, images, description} = req.body;
  try {
    const postCreated = new PostModel({
      user:req.user,
      title,
      description,
      comments:[],
      likes:0,
      dislikes:0,
      images,
    });
    postCreated.save().then((data) => {
      if (data) {
        res.status(200).send("Your POST is created. ");
      } else {
        throw new Error("Something went wrong");
      }
    });
  } catch (err) {
    res.status(500).send(err.messgae);
  }
};

export const UpdatePost = async(req:Request, res:Response)=>{
        const { title, description, images } = req.body;
        const { id } = req.params;
        try {
          const post = await PostModel.findById(id);
          post.title = title;
          post.description = description;
          post.images = images;
          await post.save();
          res.send('Post edited successfully');
        } catch (err) {
          console.error(err);
          res.status(500).send('Error editing post');
        }
}

  
  // Post like route
  export const LikeOnPost= async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      const post = await PostModel.findById(id);
      post.likes += 1;
      await post.save();
      res.send('Post liked successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error liking post');
    }
  };
  
  // Post unlike route
  export const UnlikeOnPost= async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      const post = await PostModel.findById(id);
      post.dislikes += 1;
      await post.save();
      res.send('Post unliked successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error unliking post');
    }
  };
  