import React, { useContext, useState, useEffect } from "react";
import "../style/Header.css";
import "../style/Utility.css";
import { auth } from "../firebase.js";
// import { getDoc,doc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCartShopping,
  FaUser,
  FaSun,
  FaMoon,
  FaBars,
  FaXmark,
} from "react-icons/fa6";
import { ThemeContext } from "../App";

const Header = () => {
  const pathName = window.location.pathname;
  const [isNavClosed, setNavClosed] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [user, setUser] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // const getData = async()=> {
        //     const docRef = doc(db,"Users",user.uid)
        //     const docSnap = await getDoc(docRef);
        //     setUser(docSnap.data())
        user.getIdTokenResult();
        // }
        setUser(user);

        console.log((await user.getIdTokenResult()).claims.admin);
      } else {
        setUser(null);
      }
      // firebase.auth().currentUser.getIdTokenResult()
    });
    return () => unsubscribe();
  }, []);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        alert("User is successfully logged out");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <header className="flex-row jc-sb ali-end">
      <div
        className="Logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>UNT Canteen</span>
      </div>

      <nav>
        <ul navclosed={isNavClosed.toString()}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/reviews"> Reviews</Link>
          </li>
          <li>
            {user ? (
              // If user is logged in, display user's name and logout button
              <>
                <p>Welcome, {user.email}</p>
                <button onClick={handleLogOut}>Logout</button>
              </>
            ) : (
              // If user is not logged in, display login button and signup link
              <>
                <Link to="/auth/login">Login</Link>
              </>
            )}
          </li>
          <li onClick={() => toggleDarkMode(!isDarkMode)}>
            <span className="dark-mode-toggle">
              {isDarkMode ? (
                <FaMoon title="Change to lightmode" />
              ) : (
                <FaSun title="Change to darkmode" />
              )}
            </span>
          </li>
        </ul>
      </nav>
      <div className="flex-row cart nav-icon">
        <Link to="/cart" title="Go to cart">
          <FaCartShopping />
        </Link>
        <span className="cart-quan">4</span>
      </div>
      <button
        type="button"
        className="mobile-nav-toggle nav-icon"
        title="Toggle menu"
        onClick={() => setNavClosed(!isNavClosed)}
      >
        {isNavClosed ? <FaBars /> : <FaXmark />}
      </button>
    </header>
  );
};
export default Header;
