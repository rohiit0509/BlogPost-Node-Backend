import { Response, Request } from "express"
import getDataModel from "../models/getData"

export const likeOnPost = async (req: Request, res: Response) => {
    try {
        const { userId, like } = req.body;
        const postId = req.body.postId;
        const find = await getDataModel.findOne({ $and: [{ _id: postId }, { likes: userId }] });
        if (!find) {
            const addLike = await getDataModel.findOneAndUpdate({ _id: postId }, { $push: { likes: userId } }, { new: true })
            if (addLike) {
                const likesCount = addLike.likes.length;
                res.status(200).send({ msg: "liked successfully", isLike: true, likesCount: likesCount })
            }
            else
                throw new Error("Error while liking")
        }
        else {
            const removeLike = await getDataModel.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } }, { new: true })
            if (removeLike) {
                const likesCount = removeLike.likes.length;
                res.status(200).send({ msg: "removed like successfully", isLike: false, likesCount: likesCount })
            }
            else
                throw new Error("Error while liking")
        }
    } catch (err) {
        res.status(204).send({ msg: err.message })
    }


}
