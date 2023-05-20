import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({

    UserId: {
        type: String,
        required: [true],
    },
    firstName: {
        type: String,
        required: [true],
    },
    lastName: {
        type: String,
        required: [true],
    },
    location: String,
    occupation: String,
    picturePath: String,
    description: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }
},
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;