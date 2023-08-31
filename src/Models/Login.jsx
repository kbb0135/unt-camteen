import React, {useState} from 'react';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
;


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
        // handle sign up logic
      const email = event.target[0].value;
      const password = event.target[1].value; 

      const auth = getAuth();
      console.log(auth)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigate("/home")        
        // ...
      })
    .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
  });



      }

  return (
    <div className="login">
      <h2 className="unt-login">UNT LogIn</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="LogIn" /> 
        <Link to="/signup" className="direct"><h4 className="direct">Back to SignUp</h4></Link>
      </form>
    </div>
  );
}

export default Login;
