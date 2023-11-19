import React, { useContext, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../Assets/Logo.svg";
import "../style/Header.css";
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
        console.log(user);

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
    <header>
      <Logo
        className="logo"
        onClick={() => {
          navigate("/");
        }}
        style={{ fill: "var(--primary-color)" }}
      />

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
          <>
            {user ? (
              // If user is logged in, display user's name and logout button
              <>
                <li>
                  <Link to="/account">Hi, {user.email}</Link>
                </li>
                <li>
                  <button
                    className="ghost-button red-button"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // If user is not logged in, display login button and signup link

              <li>
                {" "}
                <Link to="/auth/login">Login</Link>{" "}
              </li>
            )}
          </>
          <li
            onClick={() => toggleDarkMode(!isDarkMode)}
            className="dark-mode-toggle"
          >
            <button type="button" className="nav-icon">
              {isDarkMode ? (
                <FaMoon title="Change to lightmode" />
              ) : (
                <FaSun title="Change to darkmode" />
              )}
            </button>
          </li>
        </ul>
      </nav>
      <Link to="/cart" className="cart nav-icon" title="Go to cart">
        <FaCartShopping />
        <span className="cart-quan">4</span>
      </Link>

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
