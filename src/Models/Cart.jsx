import React, { useState, useEffect } from 'react'
import { useCart } from './CartContext'
import '../style/Cart.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Notifier } from '../Components/Notifier.jsx'
import { loadStripe } from '@stripe/stripe-js'
import CartItems from '../Components/CartItems.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase.js'
import toast from 'react-hot-toast'
import { collection, getDocs } from '@firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'




export default function Cart() {
    const { cartItems, removeFromCart, addToCart } = useCart()
    // console.log(cartItems)
    // console.log("Cart Items here")
    const [message, setMessage] = useState('No coupon applied')
    const [isValidCoupon, setIsValidCoupon] = useState(true)
    const [discount, setDiscount] = useState(0)
    const [coup, setCoup] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const [stuff, setStuff] = useState([])
    const [test, setTest] = useState("")
    const [couponName, setCouponName] = useState("");
    const [user, setUser] = useState(false);
    const [value, setValue] = useState(null)
    const [isCoupon, setIsCoupon] = useState(false);


    //get the user profile for coupon
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null)
            }
        });
        return () => unsubscribe();
    }, []);



    // ** calculate  total
    const originalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )
    var discountPer = (discount / originalPrice) * 100

    const messageStyle = {
        margin: 0,
        fontWeight: '500',
        marginBottom: '.5rem',
        color: isValidCoupon ? '#666' : '#b32d0f'
    }


    let messages = 'Invalid Discount Code'
    let discountAmt = 0
    const HandleDiscount = async () => {



        console.log("here")
        console.log(test)
        const snapshot = await getDocs(collection(db, "Coupons"));
        const coupons = await snapshot.docs.map(doc => ({
            name: doc.data().coupon,
            price: doc.data().price,
        })
        );
        await setStuff(coupons);
        console.log(stuff)
        const matchedCoupon = coupons.find(coupon => coupon.name === test)
        console.log("matched coupon=", matchedCoupon)
        if (matchedCoupon) {
            const discountPrice = matchedCoupon.price;
            await setValue(discountPrice)
            console.log(discountPrice)
            setCouponName(matchedCoupon.name);
            if (user) {
                const couponData = auth.currentUser.email + "Coupons"
                setDoc(doc(db, couponData, "coupons"), {
                    coupon: test,
                    price: discountPrice
                })
            }

        }



        // ** If code matches
        if (matchedCoupon) {
            if (user) {
                discountAmt = matchedCoupon.price;
                messages = `$${discountAmt} is applied`
                console.log("coup=", coup)
            }
            else {
                discountAmt = matchedCoupon.price;
                messages = `$${discountAmt} is applied`

                console.log("coup=", coup)
                localStorage.setItem('coupon', couponName)
                localStorage.setItem('discountCode', discountAmt)
                localStorage.setItem('couponName', test)





            }


        }
        console.log("coup=", test)

        if (user) {
            const couponData = auth.currentUser.email + "Coupons"
            const docRef = await doc(db, couponData, "coupons")
            const docSnapshot = await getDoc(docRef)
            if (docSnapshot.exists()) {
                setIsCoupon(true)
                messages = `$${discountAmt} is applied`


            }
            else {
                await setDoc(doc(db, couponData, "coupons"), {
                    coupon: test,
                    price: discountAmt
                })
                toast.success("Coupon Added")
            }

        }
        else {
            // toast.error("No user here")
            const data = localStorage.getItem("discountCode")
            const couponName = localStorage.getItem("couponName") // Retrieve the coupon name for the guest
            console.log("data=", data)
            console.log(couponName)
            if (data && couponName) {
                setIsCoupon(true)
                // Coupon applied for the guest
                messages = `$${data} is applied for ${couponName}`;
            }
        }




        // ** update state
        setIsValidCoupon(test === couponName)
        setMessage(message)
        setDiscount(discountAmt)
        setCoup('')
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                const couponData = auth.currentUser.email + "Coupons"
                const docRef = await doc(db, couponData, "coupons")
                const docSnapshot = await getDoc(docRef)
                if (docSnapshot.exists()) {
                    setIsCoupon(true)
                    messages = `$${docSnapshot.data().price} is applied for ${docSnapshot.data().coupon}`
                    setMessage(messages)
                    // setTest(docSnapshot.data().coupon)
                    setDiscount(docSnapshot.data().price)
                    discountPer = (discount / originalPrice) * 100




                }

            }
            else {
               
                const data = localStorage.getItem("discountCode")
                const couponName = localStorage.getItem("couponName")
                console.log("t=",data)
                console.log("c=", couponName)
                if (data && couponName) {
                    setIsCoupon(true);
                    setDiscount(parseFloat(data)); // Ensure to parse the data if it's a number
                    setCouponName(couponName);
                    setMessage(`$${data} is applied for ${couponName}`);

                }
            }
        }
        fetchUser()

    })


    const makePayment = async () => {
        /*
        1. We want to make sure that registered user
           only gets to check out items
        */
        // if (!auth.currentUser?.uid) {
        //     navigate('/auth/login', { state: { from: location }, replace: true })
        //     toast('Please login or register to purchase the meal!', { duration: 6000 })
        //     return
        // }
        // const stripe = await loadStripe(
        //     'pk_test_51OA0QdECOmJ4IJcKXYeYf5uMFPBsSUfKqcem25byFChYezFxxwSBp5gowGGZzd93FQ0HghGjFmn8x7UT6t9oVlg800lP2W6xoB'
        // )
        // const body = {
        //     products: cartItems
        // }
        // const headers = {
        //     'Content-Type': 'application/json'
        // }
        // try {
        //     const response = await fetch(
        //         'http://localhost:7000/api/create-checkout-session',
        //         {
        //             method: 'POST',
        //             headers: headers,
        //             body: JSON.stringify(body)
        //         }
        //     )
        //     const session = await response.json()
        //     const result = stripe.redirectToCheckout({
        //         sessionId: session.id
        //     })

        //     console.log(result, 'rest')
        // } catch (error) {
        //     toast.error('Could not connect to server')
        //     console.error(error)

        // }
        navigate("/payment")

    }
    // const getCoupon = async () => {
    //     console.log("here")
    //     console.log(test)
    //     const snapshot = await getDocs(collection(db, "Coupons"));
    //     const coupons = snapshot.docs.map(doc => ({
    //         name: doc.data().coupon,
    //         price: doc.data().price,
    //     }));
    //     await setStuff(coupons);
    //     console.log(stuff)
    //     const matchedCoupon = coupons.find(coupon => coupon.name === test)
    //     console.log("matched coupon=",matchedCoupon)
    //     if (matchedCoupon) {
    //         const discountPrice = matchedCoupon.price;
    //         console.log(discountPrice)
    //     }


    // }

    return (
        <>
            <Header />

            <section className="section-cart">
                <h2 className="section-cart__heading">Shopping Cart</h2>
                {cartItems.length ? (
                    <div className="section-cart__main">
                        <CartItems
                            data={cartItems}
                            add2cart={addToCart}
                            removeFromCart={removeFromCart}
                        />
                        <div className="section-cart__checkout">
                            <p className="checkout__text">Total: </p>
                            <p className="checkout__price-discount">
                                ${(originalPrice - discount).toFixed(2)}
                            </p>
                            <>
                                {isCoupon ? (
                                    <>
                                        <p className="checkout__price-original">
                                            ${originalPrice.toFixed(2)}
                                        </p>

                                        <p
                                            style={{
                                                margin: 0,
                                                marginBottom: '1.5rem',
                                                fontSize: '1.125rem',
                                                color: '#444'
                                            }}
                                        >
                                            {discountPer.toFixed(2)}% off
                                        </p>
                                    </>

                                ) : (
                                    <></>
                                )}
                            </>



                            <a
                                href="javascript:;"
                                className="checkout-btn"
                                onClick={() => makePayment()}
                            >
                                Checkout
                            </a>
                            <hr />
                            <div className="section-promotion">
                                <p className='promotion-p'>Promotions</p>
                                <p style={messageStyle}>{message}</p>
                                <div className="section-coupon">
                                    <input
                                        placeholder="Enter coupon"
                                        type="text"
                                        value={test}
                                        onChange={(e) => setTest(e.target.value)}
                                    />
                                    <a
                                        href="javascript:;"
                                        className="section-coupon__btn"
                                        onClick={() => HandleDiscount()}
                                    >
                                        Apply
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <NoItem />
                )}
            </section>
            <Footer />
        </>
    )
}

const NoItem = () => {
    return (
        <div className="section-no-item">
            <p>0 items in Cart</p>
            <div className="section-no-item__main">
                <p>Your cart is Empty. Keep shopping to find the perfect meal for you.</p>
                <a href="/menu">Keep shopping</a>
            </div>
        </div>
    )
}