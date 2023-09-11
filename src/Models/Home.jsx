import React from 'react'; 
import {Link} from 'react-router-dom'; 
import '../Home.css'; 
import cafeteriaPhoto from '../images/cafeteria-photo.jpg'; 
import {db} from '../firebase.js'
import {
    getFirestore, collection, getDoc, doc
} from 'firebase/firestore'

//This is reference to get the data from firestore
function Home() {
  const getData =async() => {
    const colRef = doc(db, "Drink", "sprite")
    const docSnap = await getDoc(colRef);
    console.log(docSnap.data().Name)
    // getDocs(colRef)
    // .then((snapshot) => {
    //     //console.log(snapshot.docs)
    //     let drink = [];
    //     snapshot.docs.forEach((doc) => {
    //       drink.push({...doc.data(),id: doc.id})
    //     })
    //     // console.log(drink)
    //     console.log(drink[1].Name)
        
    // })
    // .catch((error) => {
    //   console.log(error)
      
    // })
    // var userCollection = db.collection()
  }

  return (
    <div className="home">
      <header className="home-text-one">
        <h1>Welcome to UNT Cafeteria @ Discovery Park </h1>
        <p>Explore many mouth-watering dishes and more!!</p>    
        <p>Hours of Operation</p>
        <p>Monday-Thursday  7:30am - 9pm</p>
        <p>Friday 7:30am - 8pm</p>
        <p>Saturday 8:00am - 7pm</p>
        <p>Sunday CLOSED!!!</p> 
        <br></br><button onClick={getData}>Get Data</button>
      </header>
      
      
    </div>
  ); 
  
}

export default Home; 