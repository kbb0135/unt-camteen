import React, { useState, useEffect } from 'react';
import Card from 'react-credit-cards';
import "../style/Payment.css";
import { useCart } from './CartContext';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
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
    const [isNumber, setIsNumber]= useState(false);
    const [isName, setIsName] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isCVC ,setIsCVC] = useState(false);
    const [mName, isMName]= useState("")
    const [mNum, setMNum]= useState("")
    const [mCVC, setMCVC] = useState("")


    const { getTotalQuantity, cartItems } = useCart();

    const todayDate = new Date();
    console.log("todayDate=", todayDate)
    let month = (todayDate.getMonth() + 1) * 100
    let year = todayDate.getFullYear()
    const totalDate = month + year;

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
             const [enteredMonth, enteredYear] = target.value.split('/');
            const enteredDate = new Date(`20${enteredYear}`, enteredMonth - 1);
            const currentDate = new Date();
            console.log("enteredDate=", enteredDate);
            

            if (enteredDate < currentDate) {
                setIsExpired(true);
                setExpiration("Credit Card Date is expired")
                console.log("enteredDate=", enteredDate);
            }
            else {
                setExpiration("Valid Date")
            }
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
    const handleDate = () => {
        const todayDate = new Date();
        console.log("todayDate=", todayDate)
        let month = (todayDate.getMonth() + 1) * 100
        let year = todayDate.getFullYear()
        const totalDate = month + year;
        console.log(month, year)

        if (expiry >= totalDate) {

        }

    }
    const handleExpirationDate = () => {

    }
    console.log(expiry)


    const handleForm = (e) => {

        // if (!number || !name || !expiry || !cvc) {
        //     alert('Please fill in all fields');
        //     e.preventDefault();
        //     return;
        // }
        if(!number) {
            setIsNumber(true)
            setMNum('Please enter number');
            e.preventDefault();
            return;
        }
        if(!name) {
            alert('Please enter field');
            e.preventDefault();
            return;
        }
        if(!expiry) {
            alert('Please enter expiration');
            e.preventDefault();
            return;
        }
        if(!cvc) {
            alert('Please enter cvc');
            e.preventDefault();
            return;
        }


        
        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!expiryRegex.test(expiry)) {
            alert('Please enter a valid expiration date in MM/YY format');
            return;
        }

        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const enteredDate = new Date(`20${year}`, month - 1);

        if (enteredDate < currentDate) {
            alert('Please enter a valid expiration date');
            e.preventDefault();
            return;
        }




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
