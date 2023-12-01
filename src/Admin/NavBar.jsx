import React, { useContext, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../Assets/Logo.svg";
import "../style/Header.css";
import { auth, db } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
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

const NavBar = () => {
  const [isNavClosed, setNavClosed] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = await doc(db, "Users", user.uid);
          const snapShot = await getDoc(docRef);
          const userData = snapShot.data();
          setUserName(userData.FirstName);
        } catch {}
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
            <Link to="/adminmenu">Menu Manage</Link>
          </li>
          <li>
            <Link to="/adminnotification">Notification Manage</Link>
          </li>
          <li>
            <Link to="/">Coupon Manage</Link>
          </li>
          <li>
            {user ? (
              <>
                <p>Welcome, {userName}</p>
                <button onClick={handleLogOut}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <FaUser />
                </Link>
              </>
            )}
          </li>
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
export default NavBar;
