import { create } from "zustand";

export const useThemeStore=create((set)=>({
    theme:localStorage.getItem("chat-theme")|| "coffee",
    setTheme:(theme)=>{
localStorage.seItem("chat-item",theme);
    set({theme});
    }

}));
