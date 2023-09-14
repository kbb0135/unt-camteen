import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignUp from './Models/SignUp.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import MenuPage from './Pages/MenuPage.jsx';
import OTPSender from './Models/OTPSender.jsx';
import Reviews from './Models/Reviews.jsx'; 
import Cart from "./Models/Cart"; 
import AdminAddDelete from './Admin/AdminAddDelete.jsx'
const App = () => {
  return (
    
      <Routes>
        
              <Route default path="/" element={<LoginPage />} />
              <Route path='/signup' element={<SignUp/>} />
              <Route path = '/home' element={<HomePage />} />
              <Route path = "/menu" element={<MenuPage />} />
              <Route path = "/sendotp" element={<OTPSender />} />
              <Route path = "/reviews" element={<Reviews />}/>
              <Route path ="/your-cart" element={<Cart />} />
              <Route path = "/adminmenu" element = {<AdminAddDelete />} />
              
      </Routes>
  )
}
export default App;