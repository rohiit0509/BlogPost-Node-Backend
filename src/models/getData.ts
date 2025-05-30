import mongoose from "mongoose"
const getDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    userName: String,
    title: String,
    description: String,
    thumbnail: String,
    body: String,
    likes: Array,
    comments: [
        {
            msg: String,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            createdAt: Date,
        },
    ],
})

export default mongoose.model('getData', getDataSchema)