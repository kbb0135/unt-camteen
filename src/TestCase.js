import React from 'react';
import "./test.css"

const TestCase = () => {
  return (
    <div className="credit-card-page">
      <div className="items-section">
        <h2>Items in Your Cart:</h2>
        <ul>
          <li>Burger - $5.00</li>
          <li>Pizza - $7.50</li>
          <li>Soda - $1.50</li>
        </ul>
        <p>Total: $14.00</p>
      </div>
      <div className="payment-section">
        <h2>Payment Information:</h2>
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" placeholder="Enter your card number" required />
        <label htmlFor="expiration">Expiration Date:</label>
        <input type="text" id="expiration" placeholder="MM/YY" required />
        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" placeholder="Enter CVV" required />
        <button id="payButton">Pay $14.00</button>
      </div>
    </div>
  );
};

export default TestCase;
