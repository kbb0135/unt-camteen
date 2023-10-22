import React from 'react';
import { useCart } from '../Models/CartContext';

const MenuItem = ({ item }) => {
    const {addToCart} = useCart();
    
    return (
        <div className="menu-item">
            <div>
                <img src={item.image} alt={item.name} /> 
                <span>{item.name}</span><br></br>
                <span>${item.price}</span><br></br>
                <span>{item.quantity}</span>
                <button onClick={()=>addToCart(item)}>Add to Cart</button>
            </div>
        </div >
    )
}
export default MenuItem;