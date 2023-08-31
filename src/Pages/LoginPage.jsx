import React from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Login from "../Models/Login.jsx";

const LoginPage = () => {
    return(
    <div>
        <Header/>
        <Login />
        <Footer/>
        
    </div>
    )
}
export default LoginPage;