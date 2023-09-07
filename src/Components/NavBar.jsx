
import React from 'react';
import '../style.css'; // Import CSS file for Navbar component
import { Link } from 'react-router-dom';
import Cart from '../Assets/cart.svg'; 


const Navbar = () => {
  const pathName = window.location.pathname; 
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <Link to ="/home" className={pathName === "/home" ? "nav-head active-nav": "nav-head"}>
          <li className="nav-item">Home</li>
        </Link>
        <Link to = "/menu"className= {pathName === "/menu" ? "nav-head active-nav" : "nav-head"}>
          <li className="nav-item">Menu</li>
        </Link>
        <Link to = "/hoursandlocation" className={pathName === "/hoursandlocation" ? "nav-head active-nav" :"nav-head"}>
          <li className="nav-item">Hours And Location</li>
        </Link>
        <Link to = "/recreationactivities" className={pathName === "/recreationactivities" ? "nav-head active-nav":"nav-head"}>
          <li className="nav-item">Recreation Activities</li>
        </Link>
        <Link to="/reviews" className={pathName === "/reviews" ? "nav-head active-nav": "nav-head"}>
          <li className='nav-item'>Reviews</li>
        </Link>
      </ul>
      <ul className='nav-links'>
      <Link to="/your-cart" className={pathName === "/your-cart" ? "nav-head-active": "nav-head"}>
        <img className='cart-icon' src={Cart} alt="Cart"/>
      </Link>
      <input class="search" type="search" placeholder="Search..."></input>
      </ul>
      
    </nav>
  );
};
export default Navbar;