import React, { useState, useReducer } from "react";
import "../style.css";
import "../Auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
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
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await setDoc(doc(db, "Users", user.uid), {
            FirstName: firstName,
            LastName: lastName,
            email: email,
          });
          // ...
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
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
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="flex-row gap-8">
          <div>
            <label htmlFor="firstName">First Name:</label>
            <div className="flex-row ali-center jc-sb">
              <input
                type="text"
                id="firstName"
                className="firstName"
                value={firstName}
                onChange={(e) => handleFnChange(e)}
                placeholder="First Name"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <div className="flex-row ali-center jc-sb">
              <input
                type="text"
                id="lastName"
                className="lastName"
                value={lastName}
                onChange={(e) => handleLnChange(e)}
                placeholder="Last name"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <div className="flex-row ali-center jc-sb">
            <input
              type="email"
              id="email"
              className="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div className="flex-row ali-center jc-sb">
            <input
              type="password"
              id="password"
              className="password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              placeholder="Enter 6+ characters password"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="flex-row ali-center jc-sb">
            <input
              type="password"
              id="confirmPassword"
              className="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleConfirmPassword(e.target.value, password)}
              placeholder="Re-enter your password"
              required
            />
          </div>
        </div>
        <button
          className="primary-button flex-1"
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
        >
          Sign Up
        </button>
      </form>

      <div className="flex-row jc-center te-size-14 te-color-gray-2">
        Already have an account?
        <Link to="/auth/login" className="te-size-14 te-color-primary-green-md">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
