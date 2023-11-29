import React, { useContext, useState} from 'react';
import '../style/Header.css';
import '../style/Utility.css';
import { auth} from '../firebase.js';
import profile from '../Assets/users-icon/user-profile.png';
import { signOut } from 'firebase/auth';
import { useCart } from '../Models/CartContext.jsx';
import logo from '../Assets/Logo.png';
import {
    FaCartShopping,
    FaLock,
    FaUser,
    FaSun,
    FaMoon,
    FaChevronRight,
    FaArrowRightToBracket
} from 'react-icons/fa6';
import { ThemeContext } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { getTotalQuantity } = useCart()
    const [isNavOpen, setIsNavOpen] = useState(false)
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)
    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()

    window.addEventListener('click', (event) => {
        const dropdown = document.getElementById('user-drop-down')

        if (!dropdown?.contains(event.target)) {
            setShowDropdown(false)
        }
    })
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                toast('Logged out successful!')
                navigate('/')
            })
            .catch(() => {
                toast.error('Failed to logout!')
            })
    }

    return (
        <header className="header-primary">
            <div>
                <img src={logo} alt="unt logo" className="header-logo" />
            </div>
            <button
                onClick={() => setIsNavOpen((prev) => !prev)}
                className="mobile-nav-toggle"
                aria-controls="navigation-primary"
                aria-expanded={isNavOpen}
            >
                <span className="sr-only">Menu</span>
            </button>
            <nav>
                <ul
                    data-visible={isNavOpen}
                    id="navigation-primary"
                    className="navigation-primary"
                >
                    <li>
                        <a href="/" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/menu" className="nav-link">
                            Menu
                        </a>
                    </li>
                    <li>
                        <a href="/reviews" className="nav-link">
                            Review
                        </a>
                    </li>
                    <li className="nav-icons">
                        <div className="cart-container">
                            <a href="/cart" className="icon-cart">
                                <FaCartShopping />
                                <span className="cart-quan">
                                    {getTotalQuantity()}
                                </span>
                            </a>
                        </div>
                        <div className="dark-mode-toggle">
                            <a
                                href="javascript:;"
                                onClick={() => toggleDarkMode(!isDarkMode)}
                            >
                                {isDarkMode ? <FaMoon /> : <FaSun />}
                            </a>
                        </div>
                        {auth.currentUser?.uid  ?  <div className='nav-user-profile' id='user-drop-down'>
                          <img src={profile} alt='boy profile' className='nav-user' onClick={() => setShowDropdown(prev => !prev)} />

                          <div data-visible={showDropdown} className="sub-menu-wrap">
                            <div className="sub-menu">
                              <div className="user-info">
                                <img src={profile} alt='user profile logo' />
                                <p>{auth.currentUser.displayName}</p>
                              </div>
                              <hr />
                              <a href='/changeUserDetails' className='sub-menu-link'>
                                <FaUser />
                                <p>Edit Profile</p>
                                <FaChevronRight />
                              </a>
                              <a href='/changepassword' className='sub-menu-link'>
                                <FaLock />
                                <p>Change Password</p>
                                <FaChevronRight />
                              </a>
                              <a href='#' className='sub-menu-link' onClick={() => handleLogOut()}>
                                <FaArrowRightToBracket />
                                <p>Log out</p>
                                <FaChevronRight />
                              </a>
                            </div>
                          </div>
                        </div> :
                        <div className="nav-btns">
                            <a href="/auth/login" className="btn btn--login">
                                Login in
                            </a>
                            <a href="/auth/signup" className="btn btn--signup">
                                Sign up
                            </a>
                        </div>}
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;