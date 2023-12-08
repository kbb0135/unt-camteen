import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import { fetchById } from '../services/foods';
import toast from 'react-hot-toast';
import { useCart } from '../Models/CartContext'

const CartItems = (props) => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    // const [cartItems, setCartItems] = useState([])
    const fetchReviews = items => {
        console.log("items", items)
        Promise.all(items.map(item => fetchById({collectionName: item.category, id: item.name}))).then(responses => {
            // setCartItems(responses)
            console.log("Items", items)
        })
    }
    useEffect(() => {
        console.log("props.data", props.data)
        fetchReviews(props.data)
    }, [props.data])
    console.log("Cart Items:", cartItems)
    //console.log("props.data", props.data)
    return (
        <div className="cart-items">
            {cartItems?.length ? cartItems.map((item, index) => <CartItem 
            removeFromCart={props.removeFromCart} 
            add2cart={props.add2cart}
            id={index} item={item} 
            quantity={props.data.at(index).quantity}
            />) : 'No data'}
        </div>
    )
}


const CartItem = ({item, quantity, id, add2cart, removeFromCart}) => {

    return (
        <div className="cart-item" key={id}>
            <div className="cart-item__details">
                <div>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                <div className="cart-item-info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__desc">
                        {item.description}
                    </p>
                    {/* <Rating reviews={item.reviews || []} /> */}
                    <div className="cart-action">
                       
                        <div className="cart-action__add">
                            <button  className="cart-action__add-btn" onClick={() => removeFromCart(item.name)}>-</button>
                            <p className='cart-quantity'>{quantity}</p>
                            <button className="cart-action__add-btn" onClick={() => add2cart({...item, quantity})}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cart-item-price-div'>
                <p className="cart-item__price">${(item.price * quantity).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default CartItems;