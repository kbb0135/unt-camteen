import React, { useState, useEffect } from 'react';
import Card from 'react-credit-cards';
import "../style/Payment.css";
import { useCart } from './CartContext';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils';

import 'react-credit-cards/es/styles-compiled.css';

export default function Payment() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('You have finished payment!');
    // You can reset the form if needed
    // this.form.reset()
  }

  return (
    <div key='Payment'>
      <div className='App-payment'>
        <h1>Enter your payment details</h1>
        <h4>please input your information below</h4>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
        />
        <form onSubmit={handleSubmit}>
          <div className='form-group-input'>
            <small>Name on card:</small>
            <input
              type='tel'
              name='name'
              className='form-control'
              placeholder='Name'
              pattern='[a-zA-Z-]+'
              required
              value={name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group-input'>
            <small>Card Number:</small>
            <input
              type='tel'
              name='number'
              className='form-control'
              placeholder='Card Number'
              pattern='[\d ]{16,22}'
              maxLength='19'
              required
              value={number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group-input'>
            <small>Expiration Date:</small>
            <input
              type='tel'
              name='expiry'
              className='form-control'
              placeholder='Valid Thru'
              pattern='\d\d/\d\d'
              required
              value={expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group-input'>
            <small>CVC:</small>
            <input
              type='tel'
              name='cvc'
              className='form-control'
              placeholder='CVC'
              pattern='\d{3}'
              required
              value={cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group-input'>
            <small>Amount to Pay:</small>
            <div>{amount}</div>
          </div>
          <input type='hidden' name='issuer' value={issuer} />
          <div className='form-actions'>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
