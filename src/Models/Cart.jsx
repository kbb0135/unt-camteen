
import React from 'react'
import {useCart} from './CartContext'
import "../style/Cart.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Cart() {
    const { cartItems, removeFromCart, addToCart } = useCart(); 

  return (
    <div>
    <Header />
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <img src={item.image} className="img-cart"></img>-{item.name} - ${item.price}{' '}
            <button onClick={() => addToCart(item)}>+</button>
            <div>{item.quantity}</div>
            <button onClick={() => removeFromCart(item)}>-</button>
          </li>
        ))}
      </ul>
      {/* <Footer /> */}
    </div>
  );
}
