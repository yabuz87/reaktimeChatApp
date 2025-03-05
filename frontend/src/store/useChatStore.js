import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { toast } from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    isUsersLoading: false,
    isMessagesLoading: false,
    selectedUser: null,
    users: [],
    messages: [],
    onlineUsers: [],
    getUsers: async () => {
        try {
            set({ isUsersLoading: true });
            const res = await axiosInstance.get("message/get/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("There is an error in getUsers method", error.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true });
            const res = await axiosInstance.get(`message/get/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.message);
            console.log("There is an error in getMessages", error.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    selectUser: (selectedUser) => {
        set({ selectedUser });
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) {
            toast.error("No user selected");
            return;
        }
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.message);
            console.log("There is an error in sendMessage", error.message);
        }
    },
}));
