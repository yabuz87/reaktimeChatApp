import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    senderId: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },
    recieverId: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: true });

const message = mongoose.model("Message", messageSchema);
export default message;
