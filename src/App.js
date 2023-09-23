import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import SignUp from "./Models/SignUp";
import Login from "./Models/Login";
import MenuPage from "./Pages/MenuPage";
import OTPSender from "./Models/OTPSender.jsx";
import Reviews from "./Models/Reviews.jsx";
import Cart from "./Models/Cart"; 
import AdminAddDelete from './Admin/AdminAddDelete.jsx'
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
    element: <MenuPage/>,
  },
  {
    path: "/sendotp",
    element: <OTPSender/>
  }, {
    path: "/reviews",
    element: <Reviews/>,
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/adminmenu",
    element: <AdminAddDelete/>
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
