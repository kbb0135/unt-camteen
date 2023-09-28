import React from 'react';

const MenuItem = ({ item }) => {
    
    return (
        <div className="menu-item">
            <div>
                <img src={item.image} alt={item.name} /> 
                <span>{item.name}</span><br></br>
                <span>${item.price}</span><br></br>
                <span>{item.quantity}</span>
            </div>
        </div >
    )
}
export default MenuItem;