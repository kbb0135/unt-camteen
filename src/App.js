import React, { useState, useEffect, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./Pages/AuthPage.jsx";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Models/SignUp";
import Login from "./Models/Login";
import MenuPage from "./Pages/MenuPage";
import MenuItemPage from "./Pages/MenuItemPage.jsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "/menuItemPage",
    element: <MenuItemPage/>
  },
  {
    path: "/menuItemPage",
    element: <MenuItemPage/>
  },
  {
    path: "/sendotp",
    element: <OTPSender />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: '/reviews/:category/:id',
    element: <Review /> 
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/adminmenu",
    element: <AdminAddDelete/>
  },
  {
    path: "/adminnotification",
    element: <AdminNotification/>
  },
  {
    path: "/notification",
    element: <Notification />
  },
  {
    path: "/test",
    element: <TestCase />
  },
  {
    path: "/success",
    element: <Success />
  },
  {
    path: "/cancel",
    element: <Cancel />
  },
  {
    path: "/payment",
    element: <Payment />
  },
  {
    path: "/changepassword",
    element: <ChangePassword />
  },
  {
    path: "/forgetpassword",
    element: <ForgetPassword />
  },
  {
    path: "/changeUserDetails",
    element: <ChangeUserDetails />
  }
]);
export const ThemeContext = createContext(null);

const App = () => {
  const [isDarkMode, toggleDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode? "dark-mode": null}>
        <RouterProvider router={router} />
      </div>
      ;
    </ThemeContext.Provider>
  );
};
export default App;

// const App = () => {
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const access = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         try {
//           const token = await user.getIdTokenResult();
//           console.log(token.claims.admin)
//           // isAdmin = token.claims.admin;
//           setIsAdmin(token.claims.admin);
//           // console.log("admin="+isAdmin);
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         setIsAdmin(false);
//       }
//     });

//     return () => {
//       access();
//     };
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={<HomePage />}
//         />
//         <Route
//           path="/menu"
//           element={<MenuPage />} />
//         <Route
//           path="/sendotp"
//           element={<OTPSender />} />
//         <Route
//           path="/reviews"
//           element={<Reviews />} />
//         <Route
//           path="/cart"
//           element={<Cart />} />
//         <Route
//           path="/login"
//           element={<Login />} />
//         <Route
//           path="/signup"
//           element={<SignUp />} />
//           <Route path="/adminmenu" element={<AdminAddDelete />} />

//         {/* {isAdmin && (
//           <Route path="/adminmenu" element={<AdminAddDelete />} />
//         )}
//         {!isAdmin && (
//           <Route
//             path="/adminmenu"
//             element={<Navigate to="/unauthorized" />}
//           />

//         )} */}

//         <Route path="unauthorized" element={<div>Unauthorized Access</div>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
