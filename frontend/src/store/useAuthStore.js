import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
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
  login:async (data)=>{
    try {
      set({
        isLoggingIn:true
      })
    const response=await axiosInstance.post("/auth/login",data);
    set({authUser:response.data});
    toast.success("you're logged in successfully");
    
    } catch (error) {
      console.log("there is error in login method",error);
      toast.error(error.response.data.message);
      
    }finally{
      set({isLoggingIn:false});
    }

  },
  updateProfile:async (data)=>{
    try {
      set({isUpdatingProfile:true});
      const res=await axiosInstance.put("auth/updateProfile",data);
      set({authUser:res.data});
      toast.success("profile updated sucessfully");

    } catch (err) {
      console.log("there is error in ",err.message);
      toast.error(err.response.data.message);

    }finally{
          set({isUpdatingProfile:false})
    }
  }
}));
