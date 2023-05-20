import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "please enter firstName"],
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: [true, "please enter firstName"],
            min: 2,
            max: 50,
        },
        friends: {
            type: Array,
            default: [],
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            Unique: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: ""
        },
        location: String,
        occupation: {
            type: String,
            min: 10,
            max: 50,
        },
        viewedProfile: Number,
        impressions: Number,

    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema);

export default User;