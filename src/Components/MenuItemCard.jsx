import React,{useState} from 'react';
import { useCart } from '../Models/CartContext';
import {Notifier} from './Notifier';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/style.css';

const MenuItemCard = ({ item }) => {
    const { addToCart } = useCart();
    const [message, setMessage] = useState('');
    const handleAddToCart = () => {
        addToCart(item);
        setMessage('Added to cart!!');
    }
    const navigate = useNavigate();


    
    return (
        <div className='food'>
                    <div className='img-container' onClick={() => navigate(`/reviews/${item.category}/${item.id}`)}>
                        <img src={item.image} alt={item.name} className='food-img'/>
                    </div>
                    <div className='food-content'>
                        <p className='food-header'>{item.name}</p>
                        <p className='food-category'>{item.category}</p>
                        <div>
                            <p className='food-price'>&#x24;{item.price}</p>
                        </div>
                        <span>{item.quantity}</span>
                        <div>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                            <Notifier message={message} setMessage={setMessage}/>
                        </div>
                    </div>
                </div>
    )
}
export default MenuItemCard;