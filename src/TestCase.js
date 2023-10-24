import React, { useState,useEffect } from 'react'
import {auth, db} from './firebase.js' 
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth';
import "./style/style.css"
import { ReviewRating } from './Components/ReviewRating';
export default function TestCase (){
  const FoodContainer = ({ item }) => {
    const [rate, setRate] = useState(0)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
    
            if (user) {
    
                try {
                    const docRef = await doc(db, user.email, item.name)
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
        const handleRating = async (newRating) => {
            console.log(2)
            try {
                onAuthStateChanged(auth, async (user) => {
                    console.log("here")
                    if (user) {
                        const uid = user.uid
                        console.log(uid)
                        const docRef = await doc(db, user.email, item.name)
                        const snapShot = await getDoc(docRef)
                        if(snapShot.exists()) {
                          await updateDoc(docRef, {
                            rating: newRating
                          })

                        }
                        else {
                          await setDoc(doc(db, user.email, item.name), {
                          rating: newRating
                        })
                        }
                        
                        setRate(newRating)
                        
                    }
                    else {
                        alert("User must be logged in to provide ratings")
                    }
                })
            }
            catch (error) {
                console.log(error);
                console.log("here")
            }

        }
}

    return (
      <div>
        <button>Click </button>
      </div>
    )
}
