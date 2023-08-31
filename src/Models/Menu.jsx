import React from 'react';
import Card from '../Components/Card';
import Coke from '../Assets/Coke.png';
import '../style.css';
function Menu() {
    const item=()=> {
        
    }
    const prop = {
        itemName:"Apple",
        price:"$10",
        location: "Discovery Parks Market"
    };
    return (
        <div className="MenuBody">
            <Card 
            title= {prop.itemName}
            price="$1.50"
            rating="5.0"
            location={prop.location}
            imageSrc={Coke}/>
            <Card 
            title="Sushi"
            price="$3.50"
            rating="4.0"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Rice"
            price="$6.50"
            rating="1.5"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Coke"
            price="$1.50"
            rating="5.0"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Sushi"
            price="$3.50"
            rating="4.0"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Rice"
            price="$6.50"
            rating="1.5"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Coke"
            price="$1.50"
            rating="5.0"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Sushi"
            price="$3.50"
            rating="4.0"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Rice"
            price="$6.50"
            rating="1.5"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Coke"
            price="$1.50"
            rating="5.0"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Sushi"
            price="$3.50"
            rating="4.0"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
            <Card 
            title="Rice"
            price="$6.50"
            rating="1.5"
            location="Discovery Parks Market"
            imageSrc={Coke}/>
        </div>
    )
 
}

export default Menu;