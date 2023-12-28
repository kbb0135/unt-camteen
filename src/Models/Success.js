import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { useCart } from './CartContext'
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { Notifier } from '../Components/Notifier';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Success() {
  const { cartItems } = useCart();
  const [discountTotal, setDiscountTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [transactionID, setTransactionID] = useState('');
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([])
  const [user,setUser] = useState([])
  const [isEmail, setIsEmail] =useState(false)
  const navigate = useNavigate();

  const location = useLocation();
    const isSuccess = location.state?.isSuccess || false;
    console.log("isSuccess=", isSuccess);

    useEffect(() => {
      if (!isSuccess) {
        navigate('/cart');
      }
    }, [isSuccess, navigate]);
  useEffect(() => {
    setItems(cartItems)
    localStorage.clear();
  }, [cartItems])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);
      } else {
        setUser(null)
        setIsEmail(true)
      }
    });
    return () => unsubscribe();
  },[email]);

  

  const getCurrentTimeAsNumber = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}${minutes}${seconds}`;
    return formattedTime;
  };
  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0)
    if(user) {
      const fetchUser = async () => {
        if (user) {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const couponData = currentUser.email + "Coupons";
            const docRef = await doc(db, couponData, "coupons");
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
              setDiscount(docSnapshot.data().price);
              alert(discount);
            }
            setTotal(newTotal);
            setDiscountTotal(newTotal - discount);
    
            setTransactionID(uuidv4());
            setConfirmationNumber(getCurrentTimeAsNumber());
            setMessage("Order Confirmation sent to your Email if correct Email Address is used");
          } else {
            setTotal(newTotal);
            setDiscountTotal(newTotal - discount);
      
            setTransactionID(uuidv4());
            setConfirmationNumber(getCurrentTimeAsNumber());
            setMessage("Order Confirmation sent to your Email if correct Email Address is used");
            // Handle the case where currentUser is null or undefined
            console.log("User is not authenticated or currentUser is null/undefined");
          }
        }
      };
      
      fetchUser()
    }
    else {
      setTotal(newTotal);
      setDiscount(localStorage.getItem("discountCode"))
      setDiscountTotal(newTotal - discount);
      setTransactionID(uuidv4())
      setConfirmationNumber(getCurrentTimeAsNumber())
      setMessage("Order Confirmation sent to your Email if correct Email Address is used")
      toast.success("Order Confirmation sent to your Email if correct Email Address is used")
    }






  }, [cartItems, auth, localStorage, discountTotal])
  console.log(email)
  const handleSubmit = (e) => {
    onAuthStateChanged(auth, async (user) => {
      const orderDetails = cartItems.map((item) => {
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image, // Add the image directly
        };
      });
      if (user) {
        const transactionDetails = {
          transactionID: transactionID,
          confirmationNumber: confirmationNumber,
          orderDetails: orderDetails,
        }
        const details = JSON.stringify(transactionDetails)
        await setDoc(doc(db, "mail", "mails"), {
          to: user.email,
          message: {
            subject: "You order has been received",
            html: details
          }
        })
        setIsSent(true)

      }
      else {
        setEmail(e.target.value)
        const transactionDetails = {
          transactionID: transactionID,
          confirmationNumber: confirmationNumber,
          orderDetails: orderDetails,
        }
        const details = JSON.stringify(transactionDetails)
        await setDoc(doc(db, "mail", "mails"), {
          to: email,
          message: {
            subject: "You order has been received",
            html: details
          }
        })
        setIsSent(true)
        setMessage("Order Confirmation sent to your Email if correct Email Address is used")
        toast.success("Order Confirmation sent to your Email if correct Email Address is used")
        setEmail("")
      }
    })

  }
  const deleteEntireCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, email));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log(`Collection ${email} successfully deleted.`);
    } catch (error) {
      console.error('Error deleting collection: ', error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.clear();
      if(user) {
        deleteEntireCollection()
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  },);
  useEffect(()=> {
    if(user) {
      deleteEntireCollection()
    }
  })

  return (
    <div>
      <Header />
      {
        cartItems.length === 0 ?  (
          <> 
          {navigate("/menu")}  
          </>
        ) : (
          <>
              <div>Your transaction ID is : {transactionID}</div>
      <div className="items-section">
        <h2>Your Order number is {confirmationNumber}</h2>
        <h2>Items Brought</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id} index={item.name} className="cart-item">
              <img src={item.image} className="img-cart"></img>-{item.name} - ${item.price}{' '}
              <div className="itemName-div">{item.quantity}</div>
            </li>

          ))}
        </ul>
        <p className="total-pay">Total: {discountTotal}</p>

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
      <div>
        {
          auth.currentUser ? (
            <>
              <button onClick={() => handleSubmit()}>Send Order Details to the Email</button>
            </>
          ) : (
            <>
              <label htmlFor="sendEmail">Send Order Details</label>
              <input type="tel" value={email} className="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
              <button onClick={(e) => handleSubmit(e)}>Send</button>
            </>
          )
        }


        {
          isSent ? (
            <>
              <div>
                <Notifier message={message} setMessage={setMessage} />
              </div>
            </>
          ) : (
            <></>
          )
        }
      </div>
          </>

        )
      }
      
    </div>
  )
}
