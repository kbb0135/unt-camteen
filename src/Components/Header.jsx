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
  FaCaretDown,
  FaArrowRightToBracket,
  FaPenToSquare,
  FaLock,
} from "react-icons/fa6";
import { ThemeContext } from "../App";
import toast from "react-hot-toast";

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
        toast.success("User logged out.");
        navigate('/')
      })
      .catch((error) => {
        toast.error("There is an error logging out.");
      });
  };

  return (
    <header>
      <Link to="/"className="logo">
        <Logo
          className="logo"
          style={{ fill: "var(--primary-color)" }}
        />
      </Link>
      <nav>
        <ul navclosed={isNavClosed.toString()} className="primary-ul">
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
            <Link to="/notification">Notifications</Link>
          </li>
          <li className="mobile-first-li">
            <div>
              {isNavClosed ? null : (
                <FaCaretDown
                  is-user-dropdown={isUserDropdown.toString()}
                  className="user-dropdown-indicator"
                />
              )}

              <button
                type="button"
                className="nav-icon"
                id="user-icon"
                onClick={() => {
                  setUserDropdown((prev) => !prev);
                }}
                title="Manage Account"
              >
                <FaUser />{" "}
              </button>

              <ul
                className={`user-info-dropdown ${
                  isUserDropdown ? "user-dropdown-display" : ""
                }`}
              >
                {user ? (
                  <>
                    <li>
                      <h4>Welcome, {userName}</h4>{" "}
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
            <button
              type="button"
              className="dark-mode-toggle nav-icon"
              title={isDarkMode ? "Change to lightmode" : "Change to darkmode"}
            >
              {isDarkMode ? <FaMoon /> : <FaSun />}
            </button>
          </li>
        </ul>
      </nav>
      <span>
        <Link to="/cart" title="Go to cart" className="nav-icon cart">
          <span className="cart-and-quan">
            <FaCartShopping />
            <span className="cart-quan">{getTotalQuantity()}</span>
          </span>
        </Link>
      </span>
      <button
        type="button"
        className={`mobile-nav-toggle nav-icon ${
          isNavClosed ? "" : "mobile-nav-toggle-open"
        }`}
        title="Toggle menu"
        onClick={() => setNavClosed(!isNavClosed)}
      >
        {isNavClosed ? <FaBars /> : <FaXmark />}
      </button>
    </header>
  );
};
export default Header;
