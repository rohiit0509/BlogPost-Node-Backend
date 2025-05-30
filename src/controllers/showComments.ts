import { Response, Request } from "express";
import getDataModel from "../src/models/getData";

export const ShowComments = async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    const findComment = await getDataModel
      .findOne({ _id: postId }, { comments: 1 })
      .populate("comments.userId", "userName userProfile");

    if (findComment) {
      const data = findComment.comments.map((comment: any) => ({
        msg: comment.msg,
        createdAt: comment.createdAt,
        userName: comment.userId?.userName,
        userProfile: comment.userId?.userProfile,
      }));

      res.status(200).send(data);
    } else {
      res.status(404).send({ msg: "Post not found" });
    }
  } catch (err: any) {
    res.status(500).send({ msg: err.message });
  }
};
