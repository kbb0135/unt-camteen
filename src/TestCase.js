import React from 'react'
import { db } from './firebase'
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export default function () {
    const getData = async() => {
        const docRef = doc(db, "Coupons", "coupon");
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
          const free= "free";
          if(docSnap.data() === free) {
            console.log(docSnap.data().value);
          }
          else {
            console.log('no');
          }
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
