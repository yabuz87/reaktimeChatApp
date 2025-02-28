import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required:true
    },
    profilepic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const users = mongoose.model("User", userSchema);
export default users;
