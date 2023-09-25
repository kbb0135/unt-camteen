import React, { useEffect, useState } from 'react'
import '../style.css'
import { ReviewRating } from "./ReviewRating";
import { auth, db } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';



const FoodContainer = ({ item }) => {
    const [rate, setRate] = useState(0)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("here")
            if (user) {
                const uid = user.uid
                console.log(uid)
                try {
                    const docRef = await doc(db, uid, item.name)
                    const snapShot = await getDoc(docRef)
                    if(snapShot.exists()) {
                        const userData = snapShot.data()
                        setRate(userData.rating)
                    }
                }
                catch(error) {
                    console.log(error)
                }
            }


        })
    },[item])
        console.log(1)
        const handleRating = async (newRating) => {
            console.log(2)
            try {
                onAuthStateChanged(auth, async (user) => {
                    console.log("here")
                    if (user) {
                        const uid = user.uid
                        console.log(uid)
                        await setDoc(doc(db, uid, item.name), {
                            rating: newRating
                        })
                        setRate(newRating)
                        console.log("here")
                    }
                    else {
                        alert("User must be logged in to provide ratings")
                        console.log("Something is wrong")
                    }
                })
            }
            catch (error) {
                console.log(error);
                console.log("here")
            }

        }


        return (
            <div className='food-container'>
                <div>
                    <div className="food-image-container">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className='food-info'>
                        <span>{item.name}</span><br></br>
                        <span>${item.price}</span><br></br>
                        <span>{item.quantity}</span>
                        <ReviewRating
                            rating={rate}
                            onChange={handleRating}

                        />
                        {/* <div className='leave-review'>Leave a review.</div> */}
                    </div>


                </div>
            </div >
        )
    }

export default FoodContainer