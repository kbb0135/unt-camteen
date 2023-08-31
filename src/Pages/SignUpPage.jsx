import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer.jsx";
import SignUp from "../Models/SignUp.jsx";

const SignUpPage = () => {
    return(
    <div>
        <Header/>
        <SignUp />
        <Footer/>
        
    </div>
    )
}
export default SignUpPage;