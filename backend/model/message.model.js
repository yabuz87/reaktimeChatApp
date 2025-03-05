import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },
    receiverId: {
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

const messages = mongoose.model("Message", messageSchema);
export default messages;
