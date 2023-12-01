import React, { useState, useEffect, createContext } from "react";
//import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
// import AuthPage from "./Pages/AuthPage.jsx";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Models/SignUp";
import Login from "./Models/Login";
import MenuPage from "./Pages/MenuPage";
import OTPSender from "./Models/OTPSender.jsx";
import Reviews from "./Models/Reviews.jsx";
import Cart from "./Models/Cart";
import AdminAddDelete from './Admin/AdminAddDelete.jsx'
import { auth } from './firebase.js'
import AdminNotification from "./Admin/AdminNotification.jsx";
import Notification from "./Models/Notification.jsx";
import TestCase from "./TestCase.js";
import Review from "./Pages/Review.jsx";
import Success from "./Models/Success.js";
import Cancel from "./Models/Cancel.js"
import Payment from "./Models/Payment.jsx";
import ChangePassword from "./Components/ChangePassword.jsx";
import ForgetPassword from "./Models/ForgetPassword.jsx";
import ChangeUserDetails from "./Components/ChangeUserDetails.jsx";
import Header from "./Components/Header.jsx";
import PageNotFound from "./Models/PageNotFound.js";
import Unauthorized from "./Models/Unauthorized.js";
import { onAuthStateChanged } from "firebase/auth";
import AdminCoupon from "./Admin/AdminCoupon.jsx";


 export const ThemeContext = createContext(null);

const App = () => {
    const [isDarkMode, toggleDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isAdmin, setIsAdmin] = useState(null);
  const [user, setUser] = useState([]);
  var admin;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        user.getIdTokenResult();
        setIsAdmin((await user.getIdTokenResult()).claims.admin);
        console.log(isAdmin)
      } else {
        setIsAdmin(false);
      }
      // firebase.auth().currentUser.getIdTokenResult()
    });
    return () => unsubscribe();
  }, [isAdmin]);

  

  useEffect(() => {
    console.log('isAdmin:', isAdmin);
  }, [isAdmin]);
  console.log("testVaaal=",isAdmin);

  if (isAdmin === null) {
    // If isAdmin is null (still loading),return a loading indicator or null
    return <div>Loading...</div>;

  }
 
  

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode ? "dark-mode" : null}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/menu"
            element={<MenuPage />} />
          <Route
            path="/sendotp"
            element={<OTPSender />} />
          <Route 
          path="/reviews"
          element={<Reviews />}
          />
          <Route
            path= "/reviews/:category/:id"
            element={<Review />} />
          <Route
            path="/cart"
            element={<Cart />} />
          <Route
            path="/auth/login"
            element={<Login />} />
          <Route
            path="/auth/signup"
            element={<SignUp />} />
            <Route
            path="/cancel"
            element={<Cancel />} />
            <Route
            path="/notification"
            element={<Notification />} />
            <Route
            path="/test"
            element={<TestCase />} />
            <Route
            path="/success"
            element={<Success />} />
            <Route
            path="/review"
            element={<Review />} />
            <Route
            path="/payment"
            element={<Payment />} />
            <Route
            path="/changepassword"
            element={<ChangePassword />} />
            <Route
            path="/forgotpassword"
            element={<ForgetPassword />} />
            <Route
            path="/changeUserDetails"
            element={<ChangeUserDetails />} />
            <Route
            path="/admincoupon"
            element={<AdminCoupon />} />
          {isAdmin ? (
            <>
              <Route path="/adminmenu" element={<AdminAddDelete />} />
              <Route path="/adminnotification" element={<AdminNotification />} />
              </>
            ) : (
              <>
              <Route path="/adminmenu" element={<Navigate to="/unauthorized" />} />
              <Route path="/adminnotification" element={<Navigate to="/unauthorized" />} />
              </>
            )}

          <Route path="/unauthorized"
           element={<Unauthorized />}
            />
          <Route path="*" element = {<PageNotFound />} />
        </Routes>
      </Router>
    </div>
    </ThemeContext.Provider >
  );
};

export default App;
