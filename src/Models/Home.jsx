import React from 'react'; 
import {Link} from 'react-router-dom'; 
import '../Home.css'; 
import cafeteriaPhoto from '../images/cafeteria-photo.jpg'; 


function Home() {
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
      </header>
      
      
    </div>
  ); 
  
}

export default Home; 