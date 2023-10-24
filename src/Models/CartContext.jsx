import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../firebase.js"
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';


const CartContext = createContext();


export function useCart() {
  return useContext(CartContext);
}

// Modify the CartContext.js
export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems'));
    //check to see if there is data or initialize an empty array
    return storedItems || [];
  });

  const addToCart = (item) => {
    
    // Check if the item is already in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If the item is already in the cart, update its quantity
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          onAuthStateChanged(auth, async (user) => {
            const docRef = await doc(db, user.email, item.name);
            await updateDoc(docRef, {
              quantity:cartItem.quantity+1
            })
          })
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });


      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
    else {
      onAuthStateChanged(auth, async (user) => {
        console.log("test1")
        if (user) {
          try {
            const docRef = await doc(db, user.email, item.name)
            const snapShot = await getDoc(docRef)
            if (snapShot.exists()) {
              await updateDoc(docRef, {
                name: item.name,
                price: item.price,
                quantity:1  //for demo purpose
              })
              console.log("test value")
  
            }
            else {
              await setDoc(doc(db, user.email, item.name), {
                name: item.name,
                price: item.price,
                quantity:1
              })
            }
  
          }
          catch {
  
          }
        }
      })
      console.log("khdafbskd")
      // If the item is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    

  };


  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.reduce((accumulator, currentItem) => {
      if (currentItem.id === itemId) {
        if (currentItem.quantity > 1) {
          console.log("remove-", currentItem.quantity)
          accumulator.push({ ...currentItem, quantity: currentItem.quantity - 1 });
        }
      } else {
        accumulator.push(currentItem);
      }
      return accumulator;
    }, []);

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

