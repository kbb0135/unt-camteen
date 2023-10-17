import React from 'react'
import { db, messaging } from './firebase.js'
import { getDocs, collection } from 'firebase/firestore'
import admin from 'firebase-admin'

export default function TestCase() {
const users = async () => {
  const userCollection = collection(db,"Users")
  const querySnapShot = await getDocs(userCollection);
  const userEmails = querySnapShot.docs.map((doc)=>doc.data().email);
  console.log(userEmails[0])
  // const sendMessage = async()=> {
    for(const email of userEmails) {
      console.log(email)
    }
  // }
  admin.firestore().collection('mail').add({
    to:'kbb2053@gmail.com',
    message: {
      subject: 'This is a Test',
      html: 'This is an <code>HTML</code> email body.',
    },
  })
}


  return (
    <div>TestCase
      <button onClick={()=>users()}>Click Here</button>
    </div>
  )
}
