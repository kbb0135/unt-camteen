import React from 'react'
import { db, messaging } from './firebase.js'
import { getDocs, collection, updateDoc,doc, setDoc } from 'firebase/firestore'


export default function TestCase() {
const users = async () => {
  const userCollection = collection(db,"Users")
  const querySnapShot = await getDocs(userCollection);
  const userEmails = querySnapShot.docs.map((doc)=>doc.data().email);
  // const sendMessage = async()=> {
    for(const email of userEmails) {
      // await setDoc(doc(db, "mail", "mails"), {
      //   to:'kbb2053@gmail.com',
      // message: {
      //   subject: 'This is a Test',
      //   html: 'This is an <code>HTML</code> email body.',
      // }
      // })
      // console.log("success")
      
      console.log(email)
    }
    await setDoc(doc(db, "mail", "mails"), {
      to:'premadhikari182@gmail.com',
    message: {
      subject: '2 Sauces Dropped, Limited Time Only',
      html: 'His exquisite sincerity education shameless ten earnestly breakfast add. So we me unknown as improve hastily sitting forming. Especially favourable compliment but thoroughly unreserved saw she themselves. Sufficient impossible him may ten insensible put continuing. Oppose exeter income simple few joy cousin but twenty. Scale began quiet up short wrong in in. Sportsmen shy forfeited engrossed may can. Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. Her old collecting she considered discovered. So at parties he warrant oh staying. Square new horses and put better end. Sincerity collected happiness do is contented. Sigh ever way now many. Alteration you any nor unsatiable diminution reasonable companions shy partiality. Leaf by left deal mile oh if easy. Added woman first get led joy not early jokes..',
    }
    })
    console.log("success")
    
  // }
  // admin.firestore().collection('mail').add({
  //   to:'test@gmail.com',
  //   message: {
  //     subject: 'This is a Test',
  //     html: 'This is an <code>HTML</code> email body.',
  //   },
  // })
}


  return (
    <div>TestCase
      <button onClick={()=>users()}>Click Here</button>
    </div>
  )
}
