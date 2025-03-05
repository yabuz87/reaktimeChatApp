import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { toast } from "react-hot-toast";

export const useChatStore=create((set)=>({
    isUsersLoading:false,
    isMessagesLoading:false,
    selectedUser: null,
    users:[],
    messages:[],
    onlineUsers:[],
    getUsers: async ()=>{
        try {
            set({isUsersLoading:true});
        const res=await axiosInstance.get("message/get/users");
        set({users:res.data});
        } catch (error){
            toast.error(error.response.data.message);
            console.log("there is error in getUsers method",error.message);
        }finally{
            set({isUsersLoading:false});
        }
    },
    getMessages: async (userId)=>{
        try {
            set({isMessagesLoading:true});
            const res=await axiosInstance.get(`message/get/messages/${userId}`);
            set({messages:res.data});

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("there is error in getMessages",error.message);  
        }
    },
    selectUser: (selectedUser)=>{
        set({selectedUser:selectedUser});
    }


}))