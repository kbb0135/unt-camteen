import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase.js"
import { onAuthStateChanged } from 'firebase/auth'
import Header from '../Components/Header.jsx'
import { Notifier } from '../Components/Notifier.jsx'
import { setDoc, doc } from 'firebase/firestore'

export default function AdminCoupon() {
    const [input, setInput] = useState("")
    const [title, setTitle] = useState("")
    const [user, setUser] = useState(null)
    const [isSet, setIsSet] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user)
            }
            else {
                setUser(null)
            }
        })
    })
    const SetCoupon = async () => {

        if (user) {
            await setDoc(doc(db, "Coupons", title), {
                coupon: input
            }).then(() => {
                alert('Successfully added!')
                setIsSet(true);
                setMessage("Added to database Successfully")
            })

        }
        else {
            setMessage("Something went Wrong")
        }
    }


    return (
        <div>
            <div>
                <Header />
                <h1 className="text-center">Admin Coupon</h1>
                <h3>Enter Title</h3>
                <input
                    placeholder="Enter the Coupon"
                    type="tel" value={title}
                    onChange={(e) => setTitle(e.target.value)
                    }
                />

                <h3>Enter Coupon</h3>
                <input
                    placeholder="Enter the Coupon"
                    type="tel" value={input}
                    onChange={(e) => setInput(e.target.value)
                    }
                />
            </div>
            <button onClick={() => SetCoupon()}>Click Me</button>
            {
                isSet ? (
                    <>
                        <Notifier message={message} setMessage={setMessage} />
                    </>
                ) : (
                    <>
                        <Notifier message={message} setMessage={setMessage} />
                    </>
                )
            }


        </div>
    )
}
