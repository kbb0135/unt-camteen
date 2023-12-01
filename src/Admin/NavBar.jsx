import React, { useContext, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../Assets/Logo.svg";
import "../style/Header.css";
import { auth, db } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Models/CartContext.jsx";
import {
  FaCartShopping,
  FaUser,
  FaSun,
  FaMoon,
  FaBars,
  FaXmark,
  FaChevronRight,
  FaArrowRightToBracket,
  FaPenToSquare,
  FaLock,
} from "react-icons/fa6";
import { ThemeContext } from "../App";

const Header = () => {
  const { getTotalQuantity } = useCart();
  const [isNavClosed, setNavClosed] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [isUserDropdown, setUserDropdown] = useState(user);
  useEffect(() => {
    const handleClick = (event) => {
      console.log(event.target);
      if (event.target.id !== "user-icon") {
        setUserDropdown(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
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
          navigate("/adminmenu");
        }}
        style={{ fill: "var(--primary-color)" }}
      />

      <nav>
        <ul navclosed={isNavClosed.toString()}>
          <li>
            <Link to="/adminmenu">Manage Menu</Link>
          </li>
          <li>
            <Link to="/adminnotification">Manage Notifications</Link>
          </li>
          <li>
            <Link to="/admincoupon">Manage Coupon</Link>
          </li>
          <li className="mobile-first-li">
            <div
              className="nav-icon"
              id="user-icon"
              onClick={() => {
                setUserDropdown((prev) => !prev);
                console.log(userName);
              }}
            >
              <FaUser />
              <ul
                className={`user-info-dropdown ${
                  isUserDropdown ? "user-dropdown-display" : ""
                }`}
              >
                {user ? (
                  <>
                    <li>
                      <h3>Welcome, {userName}</h3>{" "}
                    </li>
                    <li>
                      <Link to="/changeUserDetails">
                        <FaPenToSquare />
                        Manage user details
                      </Link>
                    </li>
                    <li>
                      <Link to="/changepassword">
                        <FaLock />
                        Manage Password
                      </Link>
                    </li>

                    <li>
                      <Link to="#" onClick={handleLogOut}>
                        <FaArrowRightToBracket />
                        Log out
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/auth/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/auth/signup">Signup</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </li>
          <li onClick={() => toggleDarkMode(!isDarkMode)}>
            <button type="button" className="dark-mode-toggle nav-icon">
              {isDarkMode ? (
                <FaMoon title="Change to lightmode" />
              ) : (
                <FaSun title="Change to darkmode" />
              )}
            </button>
          </li>
        </ul>
      </nav>
      <span></span>
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
