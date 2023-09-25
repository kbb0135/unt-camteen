import React, { useState } from 'react'
import '../style.css'
import { ReviewRating } from "./ReviewRating";
import { auth, db } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';



const FoodContainer = ({ item, newRating }) => {
    const [rate, setRate] = useState(item.rating || 0)
    console.log(1)
    //  const handleRating = (newRating) => {
    console.log(2)
    try {
        onAuthStateChanged(auth, (user) => {
            console.log("here")
            if (user) {
                const uid = user.uid
                console.log(uid)
                // setDoc(doc(db, "Reviews", item.name), {
                //     rating: 2
                // })
                setRate(newRating)
                console.log("here")
            }
            else {
                console.log("Something is wrong")
            }
        })
    }
    catch (error) {
        console.log(error);
        console.log("here")
    }

    // }


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
                    <ReviewRating rating={rate} />
                    <div className='leave-review'>Leave a review.</div>
                </div>


            </div>
        </div >
    )
}

export default FoodContainer