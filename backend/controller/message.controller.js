import User from "../model/user.model.js";
import message from "../model/message.model.js";
import cloudinary from "../lib/cloudinary.js"
export const getUsers=async (req,res)=>{
    try {
        const loggedUserId=req.user._id;
    const filteredUser= await User.find({_id:{$ne:loggedUserId}}).select("-password");
    res.status(200).json(filteredUser);

    } catch (error) {
        console.log("there is error in getUsers controller ",error.message);
        res.status(500).json({"message":error.message});
                    }
}
export const getMessages = async (req, res) => {
    try {
        const { id: otherId } = req.params;
        const myId = req.user._id;

        const messages = await message.find({
            $or: [
                { senderId: myId, recieverId: otherId },
                { senderId: otherId, recieverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("there is error in getMessages controller", error.message);
        res.status(500).json({ "message": error.message });
    }
}

export const sendMessage=async (req,res)=>{
    try {
        const {text,image}=req.body;
        const sender=req.user._id;
        const {id:reciever}=req.params;
        if(image){
             const uploadResponse= await cloudinary.uploader.upload(image);
        }
        imageUrl=uploadResponse.secure_url;
       const newMessage=new message({
        image:imageUrl,
        senderId:sender,
        recieverId:reciever,
        text
       })  
    } catch (error) {
        console.log("there is error in sendMessage controller",error.message);
        res.status(500).json({"message":error.message});
    }

}