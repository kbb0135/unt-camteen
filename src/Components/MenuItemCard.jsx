import React,{useState} from 'react';
import { useCart } from '../Models/CartContext';
import {Notifier} from './Notifier';

const MenuItemCard = ({ item }) => {
    const { addToCart } = useCart();
    const [message, setMessage] = useState('');
    const handleAddToCart = () => {
        addToCart(item);
        setMessage('Added to cart!!');
    }


    
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
                    <div>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                        <Notifier message={message} setMessage={setMessage}/>
                </div>
                        
                </div>
               
            </div>
        </div >
    )
}
export default MenuItemCard;