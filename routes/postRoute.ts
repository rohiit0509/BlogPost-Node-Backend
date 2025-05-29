import express from 'express'
import { CreatePost, UpdatePost, LikeOnPost, UnlikeOnPost } from '../controllers/post'
import {userValidator} from "../middleware/userValidator"
import { Authorize } from '../controllers/auth';
import {ShowComments} from "../controllers/showComments"
import {CommentOnPost} from "../controllers/commentOnPost"
const postRouter = express.Router();

postRouter.post("/createpost",userValidator, CreatePost)
postRouter.patch("/editpost/:id", userValidator, UpdatePost)
postRouter.post("/commentonpost/:id", userValidator, CommentOnPost)
postRouter.put("/likeonpost/:id", userValidator, LikeOnPost)
postRouter.put("/unlikeonpost/:id", userValidator, UnlikeOnPost)
postRouter.get('/auth',userValidator,Authorize)
postRouter.get('/showcomments/:id', userValidator, ShowComments)
export default postRouter