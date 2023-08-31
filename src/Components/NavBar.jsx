
import React from 'react';
import '../style.css'; // Import CSS file for Navbar component
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <Link to ="/home" className= "nav-head"><li className="nav-item">Home</li></Link>
        <Link to = "/menu"className= "nav-head"><li className="nav-item">Menu</li></Link>
        {/* <Link to = "/maps"className= "nav-head"><li classsName="nav-item">Maps</li></Link> */}
        <Link to = "/hoursandlocation" className= "nav-head"><li className="nav-item">Hours And Location</li></Link>
        <Link to = "/recreationactivities" className= "nav-head"><li className="nav-item">Recreation Activities</li></Link>
      </ul>
      
    </nav>
  );
};
export default Navbar;