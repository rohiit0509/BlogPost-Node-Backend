import mongoose from "mongoose";
const postSchema = new mongoose.Schema( {
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description:String,
    title:String,
    likes:Number,
    dislikes:Number,
    comments:[{
        user:String,
        comment:String
    }],
    images:String
})
export default mongoose.model('Post', postSchema)