import React from "react";
import SignUp from "../Models/SignUp";
import Login from "../Models/Login";
import BurgerImg from "../Assets/burger.jpg";
import { Outlet } from "react-router-dom";
function AuthPage() {
  return (
    <div className="auth-page flex-row jc-center ali-center">
     <Outlet/>
    </div>
  );
}

export default AuthPage;
