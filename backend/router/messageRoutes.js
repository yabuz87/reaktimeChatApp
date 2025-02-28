import express from "express"
import {getUsers,getMessages} from "../controller/message.controller.js"
import {protectRoute} from "../middleware/auth.middleware.js";
const messageRouter=express.Router();


messageRouter.get("/get/users",protectRoute,getUsers);
messageRouter.get("/get/messages/:id",protectRoute,getMessages);



export  default messageRouter;