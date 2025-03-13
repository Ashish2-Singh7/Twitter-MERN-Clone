import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
    },
    img: {
        type: String
    },
    likes: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User',
                required: true,
            },
        }
    ]

},
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;