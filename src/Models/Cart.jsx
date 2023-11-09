
import React, { useState, useEffect } from 'react'
import { useCart } from './CartContext'
import "../style/Cart.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { Notifier } from '../Components/Notifier.jsx';
import { loadStripe } from '@stripe/stripe-js';

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
      console.log("discount=", discount);


      localStorage.setItem("value", value)
      localStorage.setItem("discountCode", discount);
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

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51OA0QdECOmJ4IJcKXYeYf5uMFPBsSUfKqcem25byFChYezFxxwSBp5gowGGZzd93FQ0HghGjFmn8x7UT6t9oVlg800lP2W6xoB");
    const body = {
      products: cartItems
    }
    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch("http://localhost:7000/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
    // if (result.error) {
    //   console.log(error)
    // }
  }
console.log(cartItems)

return (
  <div >
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
          <div class="container">
            {
              localStorage.getItem("discountCode") > 0 ? (
                <>
                  <div className="my-btn">
                    <b>
                      <p>{message}</p>
                      <p>Discount Code {localStorage.getItem("value")} applied: ${localStorage.getItem("discountCode")}</p>
                      <p>New Total: {discountTotal - localStorage.getItem("discountCode")}</p>
                    </b>
                  </div>
                </>
              ) : (
                <>
                  <div className="discount">Discout Code</div>
                  <input type="text" className="promo-input" onChange={val} />
                  <br></br>

                  <button onClick={() => handleDiscount()} className="disc-apply">Apply Code</button>
                </>

              )
            }
            

          </div>
          <hr></hr>


          <div class="container">
            {
              isCode ? (
                <>
                  {/* <div className="msg">
                      <b>
                        <p>{message}</p>
                        <p>Discount Price: ${discount}</p>
                        <p>New Total: {discountTotal}</p>
                      </b>
                    </div> */}
                </>
              ) : (
                <>
                  <p><b>{message}</b></p>
                </>

              )
            }
          
            <div className="my-btn">
              <button onClick={makePayment} className="pay-btn">Pay {total.toFixed(2) - localStorage.getItem("discountCode")}</button>
            </div>
          </div>
          <div>
            <Link to ="/payment">
            <button>Manual Pay</button>
            </Link> 
           
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    )}
  </div>
);
}
