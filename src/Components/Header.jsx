import React from 'react';
import NavBar from './NavBar.jsx';
import UNTBar from './UNTBar.jsx';
import '../style.css'; // Import CSS file for Navbar component


const Header = () => {
    return (
        <>
         <UNTBar/>
         <NavBar/>
        </>
      
    )
}
export default Header;