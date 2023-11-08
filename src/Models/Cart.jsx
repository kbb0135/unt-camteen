
import React, { useState, useEffect } from 'react'
import { useCart } from './CartContext'
import "../style/Cart.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { Notifier } from '../Components/Notifier.jsx';

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [isCode, setIsCode] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [value, setValue] = useState("");

  const val = (e) => {
    const data = e.target.value;
    console.log(data);
    setValue(data);
  }
  const handleDiscount = () => {

    if (value === "free") {
      setDiscount(2);
      setIsCode(true);
      setMessage("Discount Code Applied");
      localStorage.setItem("discountCode",discount);
    }
    else {
      setIsCode(false);
      setMessage("Invalid Discount Code");
      setDiscount(0)
    }
  }



  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0)

    setTotal(newTotal);
    setDiscountTotal(newTotal - discount);
  }, [cartItems, discount])

  return (
    <div>
      <Header />
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty! Add some items to get started.</p>
          <Link to="/menu">
            <button>Add Item</button>
          </Link>
        </div>
      ) : (
        <div className="food-container">
          <ul className="food-list">
            {cartItems.map((item) => (
              <li key={item.id} index={item.name} className="cart-item">
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

            <div className="discount">Discout Code</div>
            <input type="text" className="promo-input" onChange={val} />
            <br></br>

            <button onClick={() => handleDiscount()} className="disc-apply">Apply Code</button>
            <div class="container">
              {
                isCode ? (
                  <>
                    <div className="msg">
                      <b>
                        <p>{message}</p>
                        <p>Discount Price: ${discount}</p>
                        <p>New Total: {discountTotal}</p>
                      </b>
                    </div>
                  </>
                ) : (
                  <>
                    <p><b>{message}</b></p>
                  </>

                )
              }
              <hr></hr>
              <Link to="/payment-processing">
                <button className="pay-btn">Pay {total.toFixed(2) - discount}</button>
              </Link>
            </div>
          </div>

          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
}
