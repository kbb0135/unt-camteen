import React, { useState, useEffect } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Models/SignUp";
import Login from "./Models/Login";
import MenuPage from "./Pages/MenuPage";
import OTPSender from "./Models/OTPSender.jsx";
import Reviews from "./Models/Reviews.jsx";
import Cart from "./Models/Cart";
import AdminAddDelete from './Admin/AdminAddDelete.jsx'
import { auth } from './firebase.js'
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/auth",
//     element: <AuthPage />,
//     children: [
//       {
//         path: "signup",
//         element: <SignUp />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//     ],
//   },
//   {
//     path: "/menu",
//     element: <MenuPage/>,
//   },
//   {
//     path: "/sendotp",
//     element: <OTPSender/>
//   }, {
//     path: "/reviews",
//     element: <Reviews/>,
//   },
//   {
//     path: "/cart",
//     element: <Cart />
//   },
//   {
//     path: "/adminmenu",
//     element: <AdminAddDelete/>
//   }
// ]);

// const App = () => {

//   // return <RouterProvider router={router} />;
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth" element={<AuthPage />}>
//           <Route path="signup" element={<SignUp />} />
//           <Route path="login" element={<Login />} />
//         </Route>
//         <Route path="/menu" element={<MenuPage />} />
//         <Route path="/sendotp" element={<OTPSender />} />
//         <Route path="/reviews" element={<Reviews />} />
//         <Route path="/cart" element={<Cart />} />
//         {/* Use the AdminRoute component to protect this route */}
//         <AdminRoute path="/adminmenu" element={<AdminAddDelete />} />
//         <Route path="*" element={<Navigate to="/unauthorized" />} />
//         <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
//       </Routes>
//     </Router>
//   );
// };
// export default App;
// App.js
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import necessary components
// import { auth } from "./firebase"; // Import your Firebase authentication module

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const access = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdTokenResult();
          const isAdmin = token.claims.admin;
          setIsAdmin(isAdmin);
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      access();
    };
  }, []);

  return (
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
          element={<Reviews />} />
        <Route
          path="/cart"
          element={<Cart />} />
        <Route
          path="/login"
          element={<Login />} />
        <Route
          path="/signup"
          element={<SignUp />} />

        {isAdmin && (
          <Route path="/adminmenu" element={<AdminAddDelete />} />
        )}
        {!isAdmin && (
          <Route
            path="/adminmenu"
            element={<Navigate to="/unauthorized" />}
          />

        )}

        <Route path="unauthorized" element={<div>Unauthorized Access</div>} />
      </Routes>
    </Router>
  );
};

export default App;

