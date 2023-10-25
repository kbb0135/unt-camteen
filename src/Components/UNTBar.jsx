import React, { useEffect, useState } from 'react';
import Eagle from '../Assets/Logo.png';
import { auth,db } from '../firebase.js';
import { getDoc,doc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import '../style/style.css';
import { Link } from 'react-router-dom';

const UNTBar = () => {
    const [user, setUser] = useState('');
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async (user) => {
            if (user) {
                try {
                    const docRef = await doc(db, "Users", user.uid)
                    const snapShot = await getDoc(docRef)
                    const userData = snapShot.data();
                    setUserName(userData.FirstName)
                    
                }
                catch {}
                // const getData = async()=> {
                //     const docRef = doc(db,"Users",user.uid)
                //     const docSnap = await getDoc(docRef);
                //     setUser(docSnap.data())
                user.getIdTokenResult()
                // }
                setUser(user);
                
                 console.log((await user.getIdTokenResult()).claims.admin)
                 console.log(user)
                 
            }
            else {
                setUser(null);
            }
            // firebase.auth().currentUser.getIdTokenResult()
            
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
                            <p>Welcome, {userName}</p>
                            <button className='Header_btn' onClick={handleLogOut}>Logout</button>
                        </>
                    ) : (
                        // If user is not logged in, display login button and signup link
                        <>
                            <Link to="/auth/login">
                                <button className='Header_btn'>Login</button>
                            </Link>
                            <Link to="/auth/signup">
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