import React from 'react'
import { db } from './firebase'
import { collection, getDocs } from "firebase/firestore";

export default function () {
    const getData = async() => {
        const querySnapshot = await getDocs(collection(db, "budhathokikaran135@gmail.com"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }
    return (
        <div>
            <button onClick={()=>getData()}>Click</button>
            
        </div>
    )
}
