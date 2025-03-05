import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage.jsx";
import Home from "./components/pages/Home.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import SettingsPage from "./components/pages/SettingsPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import {LoaderPinwheelIcon} from "lucide-react";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar.jsx";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [authUser]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderPinwheelIcon className="size-10  animate-spin" />
        <p> &nbsp; your chatting app is loading...</p>
      </div>
    );
  }

  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={!authUser ?<SignupPage />: <Navigate to="/"/>} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signup" />} />
        </Routes>
        <Toaster />
      
    </Router>
  );
}

export default App;
