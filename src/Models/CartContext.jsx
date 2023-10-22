import React, {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export function useCart () {
    return useContext(CartContext);
}

// Modify the CartContext.js
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (item) => {
      // Check if the item is already in the cart
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  
      if (existingItem) {
        // If the item is already in the cart, update its quantity
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
  
        setCartItems(updatedCart);
      } else {
        // If the item is not in the cart, add it with quantity 1
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    };
  
    const removeFromCart = (itemId) => {
      const updatedCart = cartItems.reduce((accumulator, currentItem) => {
        if (currentItem.id === itemId) {
          if (currentItem.quantity > 1) {
            accumulator.push({ ...currentItem, quantity: currentItem.quantity - 1 });
          }
        } else {
          accumulator.push(currentItem);
        }
        return accumulator;
      }, []);
  
      setCartItems(updatedCart);
    };
  
    return (
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  }
  
