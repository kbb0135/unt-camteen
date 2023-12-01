import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "./NavBar.jsx";
import Footer from "../Components/Footer.jsx";
import { Notifier } from "../Components/Notifier.jsx";
import { setDoc, doc } from "firebase/firestore";

export default function AdminCoupon() {
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [isSet, setIsSet] = useState(false);
  const [message, setMessage] = useState("");
  const [val, setVal] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });
  const SetCoupon = async () => {
    if (user) {
      await setDoc(doc(db, "Coupons", title), {
        coupon: input,
        price: val,
      }).then(() => {
        setIsSet(true);
        setMessage("Added to database Successfully");
        setTitle("");
        setInput("");
        setVal(0);
      });
    } else {
      setMessage("Something went Wrong");
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="edit-menu">
          <h1>Admin Coupon</h1>
          <h3>Enter Title</h3>
          <div>
            <label htmlFor="coupon-title">Enter coupon title:</label>
            <input
              placeholder="Enter coupon title"
              type="tel"
              id="coupon-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="coupon">Enter Coupon</label>
            <input
              placeholder="Enter the Coupon"
              type="tel"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <h3>Enter Coupon Price</h3>
            <input
              placeholder="Enter the Coupon Price"
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </div>
          <button onClick={() => SetCoupon()}>Click Me</button>
        </div>
        {isSet ? (
          <>
            <Notifier message={message} setMessage={setMessage} />
          </>
        ) : (
          <>
            <Notifier message={message} setMessage={setMessage} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
