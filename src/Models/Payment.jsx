import React, { useState, useEffect } from 'react';
import Card from 'react-credit-cards';
import "../style/Payment.css";
import { useCart } from './CartContext';
import Header from '../Components/Header';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Notifier } from '../Components/Notifier';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './utils';

import 'react-credit-cards/es/styles-compiled.css';

const Payment = () => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCVC] = useState('');
    const [issuer, setIssuer] = useState('');
    const [focused, setFocused] = useState('');
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [isExpired, setIsExpired] = useState(false);
    const [expiration, setExpiration] = useState("")
    const [isNumber, setIsNumber] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isCVC, setIsCVC] = useState(false);
    const [mName, setMName] = useState("")
    const [mNum, setMNum] = useState("")
    const [mCVC, setMCVC] = useState("")
    const navigate =useNavigate()

    const { getTotalQuantity, cartItems } = useCart();

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
    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0)

        setTotal(newTotal);

        setDiscountTotal(newTotal - localStorage.getItem("discountCode"));
    }, [cartItems])


    const handleForm = (e) => {

        if (!number && !name && !expiry && !cvc) {
            setIsName(true)
            setIsCVC(true)
            setIsExpired(true)
            setIsNumber(true)
            setMNum('Please enter valid number');
            setMName('Please enter valid name');
            setExpiration('Please enter valid date');
            setMCVC('Please enter valid cvc');
            e.preventDefault();
            return;
        }
        if (!number) {
            setIsNumber(true)
            setMNum('Please enter number');
            e.preventDefault();
            return;
        }
        if (!name) {
            setIsName(true)
            setMNum('Please enter number');
            e.preventDefault();
            return;
        }
        if (!expiry) {
            setIsExpired(true)
            setExpiration('Please enter valid date');
            e.preventDefault();
            return;
        }
        if (!cvc) {
            setIsCVC(true)
            setMCVC('Please enter valid cvc');
            e.preventDefault();
            return;
        }
        if(number.length <15) {
            setIsNumber(true)
            setMNum("Please enter valid 15 digits num")
            e.preventDefault();
        }



        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!expiryRegex.test(expiry)) {
            setIsExpired(true)
            setExpiration('Please enter a valid expiration date in MM/YY format');
            e.preventDefault();
            return;
        }

        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const enteredDate = new Date(`20${year}`, month - 1);

        if (enteredDate < currentDate) {
            setIsExpired(true)
            setExpiration('Please enter a valid expiration date');
            e.preventDefault();
            return;
        }

        if(number === '1111 1111 1111 1111') {
            navigate("/fail")
            e.preventDefault();
            console.log("test")
        }
        console.log("here")
        console.log(number);
    }


    return (
        <div key='Payment'>
            <Header />
            <form >
                <div className="credit-card-page">
                    <div className="items-section">
                        <h2>Items in Your Cart:</h2>
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
                                            <p className="total-pay">Discount Code Applied</p>
                                            <p className="total-pay">Discount Code {localStorage.getItem("value")} applied: ${localStorage.getItem("discountCode")}</p>
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
                        {
                            isName ? (
                                <>
                                    <div className="card-Notifier">
                                        <Notifier message={mName} setMessage={setMName} />
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
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
                        {
                            isNumber ? (
                                <>
                                    <div className="card-Notifier">
                                        <Notifier message={mNum} setMessage={setMNum} />
                                    </div>


                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
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
                        {
                            isExpired ? (
                                <>
                                    <div className="card-Notifier">
                                        <Notifier message={expiration} setMessage={setExpiration} />
                                    </div>

                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
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
                        {
                            isCVC ? (
                                <>
                                    <div className="card-Notifier">
                                        <Notifier message={mCVC} setMessage={setMCVC} />
                                    </div>

                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        <Link to="/success">
                            <button id="payButton" onClick={(e) => handleForm(e)}>Pay {discountTotal}</button>
                        </Link>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Payment;
