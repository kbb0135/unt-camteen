import React, { useState, useEffect } from 'react';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from "../src/Models/utils";
import { useCart } from './Models/CartContext.jsx';
import Card from 'react-credit-cards';

const Payment = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [issuer, setIssuer] = useState('');
  const [focused, setFocused] = useState('');
  const [amount, setAmount] = useState(0);

  const { getTotalQuantity } = useCart();
  useEffect(() => {
    setAmount(getTotalQuantity());
  }, [getTotalQuantity]);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer(issuer);
    }
  }

  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  }

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
      setNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
      setCVC(target.value);
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value); // Update the name state with the new value
  }

  return (
    <div key='Payment'>
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
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={handleCallback}
          />

          <label htmlFor="name">CardName</label>
          <input
            type='tel'
            name='name'
            className='input-field'
            placeholder='Name'
            pattern='[a-zA-Z-]+'
            required
            value={name}
            onChange={handleNameChange}
            onFocus={handleInputFocus}
          />
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type='tel'
            name='number'
            className='input-field'
            placeholder='Card Number'
            pattern='[\d ]{16,22}'
            maxLength='19'
            required
            value={number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <label htmlFor="expiration">Expiration Date:</label>
          <input
            type='tel'
            name='expiry'
            className='input-field'
            placeholder='Valid Thru'
            pattern='\d\d/\d\d'
            required
            value={expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <label htmlFor="cvv">CVV:</label>
          <input
            type='tel'
            name='cvc'
            className='input-field'
            placeholder='CVC'
            pattern='\d{3}'
            required
            value={cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <button id="payButton">Pay $14.00</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;