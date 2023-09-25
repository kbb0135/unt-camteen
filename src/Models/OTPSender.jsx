import React from 'react'
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";

export default function OTPSender() {
    
    const Submit = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        // declare all characters
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        function generateString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        const password = generateString(7);

        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const admin = userCredential.user;
                    console.log("Admin created successfully");
                    setDoc(doc(db, "Admins", admin.uid), {
                        email: email
                    });
                    const actionCodeSettings = {
                        url: "http://localhost:3000/",
                        handleCodeInApp: true,
                        domainLink: "http://localhost:3000h"
                    }
                    sendSignInLinkToEmail(auth, email, actionCodeSettings)
                        .then(() => {
                            alert("OTP sent to your mail")
                            //window.localStorage.setItem('emailForSignIn', email)
                           
                        })
                        .catch((error) => {
                            const errorMessage = error.message
                            alert(errorMessage)
                        })

                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage)
                })
        }
        catch { }
        // try {
        //     sendSignInLinkToEmail(auth, email, "localhost:3000")
        //     .then(()=>{
        //         alert("OTP sent to your mail")
        //         window.localStorage.setItem('emailForSignIn', email)
        //     })
        //     .catch((error)=>{
        //         const errorMessage = error.message
        //         alert(errorMessage)
        //     })
        // }
        // catch {

        // }
    }
    return (
        <div>
            <form onSubmit={Submit}>
                <label htmlFor="itemName">Enter email to send OTP code to:</label>
                <input type="text" id="otp" className="otp" />
                <input type="submit" value="Submit" alt=" " />
            </form>
        </div>
    )
}
