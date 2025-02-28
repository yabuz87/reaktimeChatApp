import express from "express"
const authRouter=express.Router();
import {protectRoute} from "../middleware/auth.middleware.js"
import {signup,login,logout,updateProfile,checkAuth} from "../controller/auth.controller.js";

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.put("/update-profile", protectRoute, updateProfile);
authRouter.get("/check", protectRoute, checkAuth);


export default authRouter;