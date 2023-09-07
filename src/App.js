import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import MenuPage from "./Pages/MenuPage.jsx";
import AdminAddMenu from "./Models/AdminAddMenu.jsx";
import OTPSender from "./Models/OTPSender.jsx";

const App = () => {
  return (
    <Routes>
      <Route default path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/adminmenu" element={<AdminAddMenu />} />
      <Route path="/sendotp" element={<OTPSender />} />
    </Routes>
  );
};
export default App;
