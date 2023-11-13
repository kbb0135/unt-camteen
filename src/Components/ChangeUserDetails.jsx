import React, { useState } from 'react'
import { auth, db } from "../firebase.js"
import Header from './Header'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";

export default function ChangeUserDetails() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "Users", user.uid);
            const docSnapShot = await getDoc(docRef);
            console.log(user.uid)
            if (docSnapShot.exists()) {
                console.log('Document data:', docSnapShot.data().email);
                setFirstName(docSnapShot.data().FirstName)
                setLastName(docSnapShot.data().LastName)
            }
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }
    })
    
    const handleChange=(e)=> {
        setFirstName(e.target.value[0]);
        setLastName(e.target.value[1]);
    }   

    return (
        <div>
            <Header />
            <div>
                <h1 className="text-center">Change User Details</h1>
                <label htmlFor="First Name">Change First Name</label>
                <input type="tel" value={firstName} placeholder="First Name"></input>
                <label htmlFor="First Name">Change Last Name</label>
                <input type="tel" value={lastName}placeholder="Last Name"></input>
                <br></br>
                <button onClick={""}>Submit</button>
                
            </div>
        </div>
    )
}
