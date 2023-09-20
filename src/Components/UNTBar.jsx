import React, { useEffect, useState } from 'react';
import Eagle from '../Assets/Logo.png';
import { auth } from '../firebase.js';
// import { getDoc,doc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import '../style.css';
import { Link } from 'react-router-dom';

const UNTBar = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // const getData = async()=> {
                //     const docRef = doc(db,"Users",user.uid)
                //     const docSnap = await getDoc(docRef);
                //     setUser(docSnap.data())

                // }
                setUser(user);
                console.log(user)
            }
            else {
                setUser(null);
            }
        })
        return () => unsubscribe();
    }, []);
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                alert("User is successfully logged out")
            })
            .catch((error) => {
                alert(error)
            })
    }


    return (
        <div className="untbar">
            <div className="untHeaderCol1">
                <div className="untImg">
                    <img src={Eagle} alt="UNT_Eagle" className="untbar-eagle" />
                </div>

            </div>


            <div className='untHeaderCol2'>
                <div className='untHeaderTitle'>
                    <h3 className="untbarText">UNIVERSITY OF NORTH TEXAS</h3>
                    <h2 className="untbarText">UNT CAFTERIA</h2>
                </div>

            </div>


            <div className='untHeaderCol3'>
                <div className='untHeaderLogin'>
                    {user ? (
                        // If user is logged in, display user's name and logout button
                        <>
                            <p>Welcome, {user.email}</p>
                            <button className='Header_btn' onClick={handleLogOut}>Logout</button>
                        </>
                    ) : (
                        // If user is not logged in, display login button and signup link
                        <>
                            <Link to="/">
                                <button className='Header_btn'>Login</button>
                            </Link>
                            <Link to="/signup">
                                <p>No Account? Sign Up HERE</p>
                            </Link>
                        </>
                    )}
                </div>


            </div>

        </div>
    );
}

export default UNTBar;