import User from "../model/user.model.js";
import Message from "../model/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsers = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedUserId } }).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("There is an error in getUsers controller", error.message);
        res.status(500).json({ "message": error.message });
    }
};
export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!receiverId || !text) {
            return res.status(400).json({ "message": "Both receiverId and text fields are required." });
        }

        let imageUrl = null;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("There is an error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

