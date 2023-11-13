import React, { useState } from 'react'
import { auth } from "../firebase.js"
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import Header from './Header.jsx';

export default function () {
    const [password, setPassword] = useState("");

    const getPassword = (e) => {
        const value = e.target.value
        setPassword(value);

    }

    const handlePassword = () => {
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
        <div>
            <Header />
            <h1 className="text-center">Change Password</h1>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" className="password" onChange={getPassword} placeholder="Enter your new password" />
                <button onClick={() => handlePassword()}>Change Password</button>
            </div>
        </div>
    )
}
