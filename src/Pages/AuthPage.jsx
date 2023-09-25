import React from "react";
import { Outlet } from "react-router-dom";
function AuthPage() {
  return (
    <div className="auth-page flex-row jc-center ali-center">
     <Outlet/>
    </div>
  );
}

export default AuthPage;
