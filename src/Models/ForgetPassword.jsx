import React, { useState } from "react";
import "../style/Auth.css"
import { Link } from "react-router-dom";
import {auth} from '../firebase.js'
import {Notifier} from "../Components/Notifier"
import { sendPasswordResetEmail } from "firebase/auth";
function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [isNotified, setIsNotified] = useState(false)
    const [message, setMessage] = useState("")
  const getEmail =(e)=> {
    const val = e.target.value;
    setEmail(val);
  }
  const handleEmail = ()=> {
    console.log(email)
    sendPasswordResetEmail(auth, email).then(()=> {
        // Email sent.
      setIsNotified(true)
      if(isNotified) {
        setMessage("If user is created with this email, Reset Email has been sent")
        
      }


    }).catch((error) => {
        alert(error.Message)
    })
    setEmail("") 

  }

  return (
    <div className="auth-page flex-row jc-center ali-center">
      <div className="auth-form">
        <span className="form-name">Enter User Email Related to Account</span>
        {/* //don not use form here, it refreshes the page and firebase cannot handle it */}
        <div className="flex-col">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              id="email"
              className="email"
              onChange={getEmail}
              placeholder="Email"
              required
            />
          </div>
          
          <button onClick = {handleEmail} className="primary-button" >
            Reset Password
          </button>
          <Notifier message={message} setMessage={setMessage}/>
        </div>

        <div className="flex-row jc-center te-size-14 te-color-gray-2">
          <Link to="/auth/login" className="te-size-14 te-color-primary-green-md">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
