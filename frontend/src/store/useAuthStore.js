import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: true,
  isUpdatingProfile: true,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance("auth/check");
      set({ authUser: response.data });
    } catch (err) {
      console.error("Error in checkAuth method:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", data);
      

      toast.success("Account has been created successfully! 🎉");
      set({ authUser:response.data});
    } catch (error) {
      console.error("Error in signup method:", error);

      // Ensure error messages are meaningful
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during signup.";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout:async ()=>{
   try{
    await axiosInstance.post("/auth/logout");
    set({authUser:null});
    toast.success("Logged out successfully");
   }catch(error)
   {
    console.log("there is error in  logout function",error);
    toast.error("the ")
   }
    
  },
  login:async ()=>{
    

  }
}));
