import React, { useState } from 'react';
import { useCart } from '../Models/CartContext';
import {Notifier} from './Notifier';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';

const MenuItemCard = ({ item, setBudget, budget, isBudgetSet, addToCartWithoutBudget }) => {
    const { addToCart } = useCart();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (isBudgetSet) {
            if (item.price <= 0) {
                alert('Item price should be greater than 0 to add to cart.');
            } else {
                if (budget - item.price >= 0) {
                    addToCart(item);
                    setMessage('Added to cart!!');
                    setBudget(item);
                    console.log("Here");
                } else {
                    // setMessage("You don't have enough budget!");
                    alert("You do not have enough budget!");
                }
            }
        } else {
            //if budget is not set, call this function directly
            addToCartWithoutBudget(addToCart(item));
            setMessage('Item Added to Cart');
        }
    };



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
                        <div>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                            <Notifier message={message} setMessage={setMessage}/>
                        </div>
                    </div>
                </div>
    )
}
export default MenuItemCard;