import React, { useState } from 'react';
import '../style.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';



function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[4].value;
    console.log(firstName + lastName + email)
    try {
      createUserWithEmailAndPassword(auth, email, password)

        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("I am here")
          console.log(user.uid)
          await setDoc(doc(db, "Users", user.uid), {
            FirstName: firstName,
            LastName: lastName,
            email: email
          })
          console.log("I am here too")
         

          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
        });


      console.log("here")
      navigate("/home")
    }

    catch { }

  }
  return (
    <div className="signup">
      <h1>UNT Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="sign">First Name:</label>
        <input type="text" id="firstName" className="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <label htmlFor="lastName" className="sign">Last Name:</label>
        <input type="text" id="lastName" className="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <label htmlFor="email" className="sign">Email:</label>
        <input type="email" id="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="confirmEmail" className="sign">Confirm Email:</label>
        <input type="email" id="confirmEmail" className="confirmEmail" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
        <label htmlFor="password" className="sign">Password:</label>
        <input type="password" id="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="confirmPassword" className="sign">Confirm Password:</label>
        <input type="password" id="confirmPassword" className="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <input type="submit" value="Sign Up" />
        <Link to="/" className="direct"><h4 className="direct">Back to Login</h4></Link>
      </form>
    </div>
  );
}

export default SignUp;
