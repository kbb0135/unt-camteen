import React from 'react';

const MenuItem = ({ item }) => {
    
    return (
        <div className="menu-item">
            <div>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <span>${item.price}</span>
            </div>
        </div >
    )
}
export default MenuItem;