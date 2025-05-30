import { RequestHandler } from "express";
import getDataModel from "../models/getData";

export const CommentOnPost: RequestHandler = async (req, res) => {
  const { userId, comment } = req.body;
  const postId = req.params.id;

  try {
    // Input validation
    if (!postId || !userId || !comment) {
      res.status(400).send({ msg: "Missing required fields" });
      return;
    }

    const post = await getDataModel.findById(postId);

    if (!post) {
      res.status(404).send({ msg: "Post not found" });
      return;
    }

    const newComment = {
      msg: comment,
      userId,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).send({
      msg: "Comment added successfully",
      comment: newComment,
      postId: post._id
    });
  } catch (err: any) {
    console.error("Comment Error:", err);
    res.status(500).send({ msg: "Error adding comment", error: err.message });
  }
};
