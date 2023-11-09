import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { useCart } from './CartContext'
import { v4 as uuidv4 } from 'uuid';

export default function Success() {
  const { getTotalQuantity, cartItems } = useCart();
  const [discountTotal, setDiscountTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0)

    setTotal(newTotal);
    setDiscount(localStorage.getItem("discountCode"))
    setDiscountTotal(newTotal - discount);
    
  }, [cartItems])
  const transictionID = uuidv4()
  const getCurrentTimeAsNumber = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}${minutes}${seconds}`;
    return formattedTime;
  };
  return (
    <div>
      <Header />
      <div>Your transaction ID is : {transictionID}</div>
      <div className="items-section">
        <h2>Your Order number is {getCurrentTimeAsNumber()}</h2>
        <h2>Items Brought</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} index={item.name} className="cart-item">
              <img src={item.image} className="img-cart"></img>-{item.name} - ${item.price}{' '}
              <div className="itemName-div">{item.quantity}</div>
            </li>

          ))}
        </ul>
        <p className="total-pay">Total: {total}</p>

        <div class="container">
          {
            localStorage.getItem("discountCode") > 0 ? (
              <>
                <div className="my-btn">
                  <p className="total-pay">Discount Code {localStorage.getItem("value")} applied: ${parseFloat(discount).toFixed(2)}</p>
                  <hr></hr>
                  <p className="total-pay-dicount"> New Total: {discountTotal}</p>
                </div>
              </>
            ) : (
              <>
              </>

            )
          }


        </div>
      </div>
    </div>
  )
}
