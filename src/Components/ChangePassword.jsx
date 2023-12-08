import React, { useState } from 'react'
import { auth } from "../firebase.js"
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../style/Menu.css'

export default function () {
    const [password, setPassword] = useState("");

    const getPassword = (e) => {
        const value = e.target.value
        setPassword(value);

    }

    const handlePassword = (e) => {
        e.preventDefault();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                updatePassword(user, password).then(() => {
                    alert('Password Updated!')
                })
                    .catch((error) => {
                        alert(error)
                    })
            }
            else {
                console.log("No user");
            }
        })

        console.log(password);
    }

    return (
        <>
            <Header />
            <div className='user-detail-page'>
                <div></div>
            <h1>Edit Password</h1>
            <form className="menu-edit" onSubmit={ (e) => handlePassword(e)}>
                <label htmlFor="password">Password</label>
                <input type="password" className="password" onChange={getPassword} placeholder="Enter your new password" />
                <button  type="submit" className='primary-button'>Change Password</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}
