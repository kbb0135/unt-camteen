import React,{useState} from 'react';
import { useCart } from '../Models/CartContext';
import {Notifier} from './Notifier';

const MenuItem = ({ item }) => {
    const { addToCart } = useCart();
    const [message, setMessage] = useState('');
    const handleAddToCart = () => {
        addToCart(item);
        setMessage('Added to cart!!');
    }

    return (
        <div className="menu-item">
            <div>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span><br></br>
                <span>${item.price}</span><br></br>
                <span>{item.quantity}</span>
                <div>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <Notifier message={message} setMessage={setMessage}/>
                </div>
            </div>
        </div >
    )
}
export default MenuItem;