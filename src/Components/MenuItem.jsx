import React from 'react';

const MenuItem = ({ item }) => {
    
    return (
        <div className="menu-item">
            <div>
                <img className="card-img" src={item.image} alt={item.name} /> 
                <div className="card-container">
                    <div className="card-info">
                        <h3 className="card-text">{item.name}</h3>
                        <h4 className="card-text">${item.price}</h4>
                        <span>{item.quantity}</span>
                    </div>
                    <div className="card-btn">
                        <button>+</button>
                    </div>
                </div>
               
            </div>
        </div >
    )
}
export default MenuItem;