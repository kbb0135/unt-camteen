import React, { useState } from "react";
import "../style/style.css";
import "../style/Auth.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import Header
  from "../Components/Header";
import Footer from "../Components/Footer";
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [FnCheck, setFnCheck] = useState(false);
  const [lastName, setLastName] = useState("");
  const [LnCheck, setLnCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[4].value;
    const displayName = [firstName, lastName].join(' '); 
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await updateProfile(auth.currentUser, {displayName}); 
          
          await setDoc(doc(db, "Users", user.uid), {
            FirstName: firstName,
            LastName: lastName,
            email: email,
          });
          // ...
          navigate("/");
        })
        .catch((error) => {
          // const errorMessage = error.message;
          setSignUpError(error.message);
          return;
          // ..
        });
    } catch {}
  };
  const handleFnChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value.length > 0) {
      setFnCheck(true);
      return;
    }
    setFnCheck(false);
  };
  const handleLnChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value.length > 0) {
      setLnCheck(true);
      return;
    }
    setLnCheck(false);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailCheck(true);
      return;
    }
    setEmailCheck(false);
  };
  const handlePasswordChange = (e) => {
    const passwordLength = e.target.value.length;
    setPassword(e.target.value);
    handleConfirmPassword(confirmPassword, e.target.value);
    if (passwordLength >= 6) {
      setPasswordCheck(true);
    } else if (passwordLength >= 1) {
      setPasswordCheck(false);
    }
  };
  const handleConfirmPassword = (confirmPassword, password) => {
    setConfirmPassword(confirmPassword);
    if (confirmPassword === password && confirmPassword !== "") {
      setConfirmPasswordCheck(true);
    } else {
      setConfirmPasswordCheck(false);
    }
  };
  return (
    <>
      <Header/>
    <div className="auth-page">
      <div className={`auth-form  ${signUpError && "box-invalid"}`}>
        <div>
          <div className="form-name">Create an account</div>
          {signUpError !== "" && (
            <span className="te-invalid">
              <FaExclamationTriangle />
              {signUpError}
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="firstName"
            value={firstName}
            onChange={(e) => handleFnChange(e)}
            placeholder="First Name"
            required
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="lastName"
            value={lastName}
            onChange={(e) => handleLnChange(e)}
            placeholder="Last name"
            required
          />
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            id="email"
            className="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            placeholder="Enter 6+ characters password"
            autoComplete="on"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleConfirmPassword(e.target.value, password)}
            placeholder="Re-enter your password"
            autoComplete="on"
            required
          />
          <button
            className="primary-button"
            type="submit"
            disabled={
              !(
                FnCheck &&
                LnCheck &&
                emailCheck &&
                passwordCheck &&
                confirmPasswordCheck
              )
            }
            title={
              !(
                FnCheck &&
                LnCheck &&
                emailCheck &&
                passwordCheck &&
                confirmPasswordCheck
              )
                ? "Please complete the form then continue"
                : ""
            }
          >
            Sign Up
          </button>
        </form>

        <div>
          Already have an account?
          <Link to="/auth/login">Log in</Link>
        </div>
      </div>
      </div>
      <Footer/>
      </>
  );
}

export default SignUp;
