import React, { useState, useEffect, createContext } from "react";
//import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
// import AuthPage from "./Pages/AuthPage.jsx";
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
import OrderCategory from "./Models/OrderCategory.jsx";
// import Unauthorized from "./Models/Unauthorized.js";
import Header from "./Components/Header.jsx";
import PageNotFound from "./Models/PageNotFound.js";
import Unauthorized from "./Models/Unauthorized.js";
import { onAuthStateChanged } from "firebase/auth";
import AdminCoupon from "./Admin/AdminCoupon.js";

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
//     element: <MenuPage />,
//   },
//   {
//     path: "/sendotp",
//     element: <OTPSender />,
//   },
//   {
//     path: "/reviews",
//     element: <Reviews />,
//   },
//   {
//     path: '/reviews/:category/:id',
//     element: <Review />
//   },
//   {
//     path: "/cart",
//     element: <Cart />,
//   },
//   {
//     path: "/adminmenu",
//     element: <AdminAddDelete />
//   },
//   {
//     path: "/adminnotification",
//     element: <AdminNotification />
//   },
//   {
//     path: "/notification",
//     element: <Notification />
//   },
//   {
//     path: "/test",
//     element: <TestCase />
//   },
//   {
//     path: "/success",
//     element: <Success />
//   },
//   {
//     path: "/cancel",
//     element: <Cancel />
//   },
//   {
//     path: "/payment",
//     element: <Payment />
//   },
//   {
//     path: "/changepassword",
//     element: <ChangePassword />
//   },
//   {
//     path: "/forgetpassword",
//     element: <ForgetPassword />
//   },
//   {
//     path: "/changeUserDetails",
//     element: <ChangeUserDetails />
//   },
//   {
//     path: "/orderbycategory",
//     element: <OrderCategory />
//   }
// ]);
// export const ThemeContext = createContext(null);

// const App = () => {
//   const [isDarkMode, toggleDarkMode] = useState(
//     window.matchMedia("(prefers-color-scheme: dark)").matches
//   );


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
//   const adminRoute = (element) => {
//     return isAdmin ? element : <Navigate to="/unauthorized" />;
//   };



//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       <div className={isDarkMode ? "dark-mode" : null}>
//         <RouterProvider router={router} />
//       </div>
//     </ThemeContext.Provider>
//   );

// };
// export default App;
 export const ThemeContext = createContext(null);

const App = () => {
    const [isDarkMode, toggleDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isAdmin, setIsAdmin] = useState(false);
  var admin;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.getIdTokenResult();
        setIsAdmin((await user.getIdTokenResult()).claims.admin);
        console.log(isAdmin)
      } else {
      }
      // firebase.auth().currentUser.getIdTokenResult()
    });
    return () => unsubscribe();
  }, [isAdmin]);

  useEffect(() => {
    console.log('isAdmin:', isAdmin);
  }, [isAdmin]);
  console.log("testVaaal=",isAdmin);

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
            path="/ordercategory"
            element={<OrderCategory />} />
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
