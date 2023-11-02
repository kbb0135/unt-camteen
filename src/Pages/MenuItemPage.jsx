import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MenuItem from "../Models/MenuItem.jsx";

const MenuItemPage = () => {
    return (
        <div className="MenuItemPage">
            <Header/>
            <MenuItem/>
            <Footer/>
        </div>
    )
}

export default MenuItemPage;