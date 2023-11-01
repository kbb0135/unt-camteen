
import React, { useState, useEffect } from 'react'
import { useCart } from './CartContext'
import "../style/Cart.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0)
    setTotal(newTotal);
  }, [cartItems])

  return (
    <div>
      <Header />
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty! Add some items to get started.</p>
          <Link to="/menu">
            <button>Add Item</button>
          </Link>
        </div>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} index = {item.name}className="cart-item">
                <img src={item.image} className="img-cart"></img>-{item.name} - ${item.price}{' '}
                <button onClick={() => addToCart(item)} className="plus-btn">+</button>
                <div className="itemName-div">{item.quantity}</div>
                <button onClick={() => removeFromCart(item.name)} className="minus-btn">-</button>
              </li>
            ))}
          </ul>
          <div>
            <hr></hr>
            <div className="food-total">
              <div>Total Price: ${total.toFixed(2)}</div>
            </div>
            <button className="pay-btn">Pay {total.toFixed(2)}</button>
          </div>

          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
}
