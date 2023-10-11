import React from 'react';
import '../style/style.css'; // Import CSS file for Navbar component
import { Link } from 'react-router-dom';
import Cart from '../Assets/cart.svg'; 

const NavBar = () => {
  const pathName = window.location.pathname; 
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <Link to ="/" className={pathName === "/home" ? "nav-head active-nav": "nav-head"}>
          <li className="nav-item">Home</li>
        </Link>
        <Link to = "/menu"className= {pathName === "/menu" ? "nav-head active-nav" : "nav-head"}>
          <li className="nav-item">Menu</li>
        </Link>
        <Link to = "Update" className={pathName === "/adminmenu" ? "nav-head active-nav" :"nav-head"}>
          <li className="nav-item">Update Menu</li>
        </Link>
        <Link to = "/adminnotification" className={pathName === "/adminnotification" ? "nav-head active-nav":"nav-head"}>
          <li className="nav-item">Admin Notification</li>
        </Link>
        <Link to="/reviews" className={pathName === "/reviews" ? "nav-head active-nav": "nav-head"}>
          <li className='nav-item'>Reviews</li>
        </Link>
      </ul>
      <ul className='nav-links'>
      <Link to="/cart" className={pathName === "/your-cart" ? "nav-head-active": "nav-head"}>
        <img className='cart-icon' src={Cart} alt="Cart"/>
      </Link>
      <input className="search" type="search" placeholder="Search..."></input>
      </ul>
      
    </nav>
  );
};
export default NavBar;