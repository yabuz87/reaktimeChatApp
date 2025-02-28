import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    senderId:{
        ref:UserActivation,
        required:true,
    },
    recieverId:{
        ref:UserActivation,
        required:true,
    },

})

 const message=mongoose.model("Message",messageSchema);
 export default message
