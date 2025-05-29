import { Request, Response } from "express";
import getDataModel from "../models/getData";

export const CommentOnPost = async (req: Request, res: Response) => {
  const { userId, comment } = req.body;
  const postId = req.params.id;

  try {
    const post = await getDataModel.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const newComment = {
      msg: comment,
      userId,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    return res.status(200).send({msg:"Comment added successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding comment");
  }
};
