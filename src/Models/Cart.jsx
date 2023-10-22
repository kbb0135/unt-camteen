// import React, { useState } from 'react';

// function Product({ product, onAddToCart }) {
//   return (
//     <div className="product">
//       <img src={product.image} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>Price: ${product.price.toFixed(2)}</p>
//       <button onClick={() => onAddToCart(product)}>Add to Cart</button>
//     </div>
//   );
// }

// function CartItem({ item, onRemoveFromCart }) {
//   return (
//     <div className="cart-item">
//       <span>{item.name}</span>
//       <span>Quantity: {item.quantity}</span>
//       <span>Total: ${item.price.toFixed(2)}</span>
//       <button onClick={() => onRemoveFromCart(item)}>Remove</button>
//     </div>
//   );
// }

// function ShoppingCart({ cart, onRemoveFromCart }) {
//   return (
//     <div className="shopping-cart">
//       <h2>Your Cart</h2>
//       {cart.map((item) => (
//         <CartItem key={item.id} item={item} onRemoveFromCart={onRemoveFromCart} />
//       ))}
//     </div>
//   );
// }

// function Cart() {
//   const [products] = useState([
//     { id: 1, name: 'Product 1', price: 10.99, image: 'product1.jpg' },
//     { id: 2, name: 'Product 2', price: 5.99, image: 'product2.jpg' },
//     // Add more products here
//   ]);

//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     const existingItemIndex = cart.findIndex((item) => item.id === product.id);

//     if (existingItemIndex !== -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingItemIndex].quantity += 1;
//       updatedCart[existingItemIndex].price += product.price;
//       setCart(updatedCart);
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (itemToRemove) => {
//     const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
//     setCart(updatedCart);
//   };

//   return (
//     <div className="App">
//       <h1>Shopping Cart</h1>
//       <div className="products">
//         {products.map((product) => (
//           <Product key={product.id} product={product} onAddToCart={addToCart} />
//         ))}
//       </div>
//       <ShoppingCart cart={cart} onRemoveFromCart={removeFromCart} />
//     </div>
//   );
// }

// export default Cart;
import React from 'react';
import CartItem from "./CartItem.jsx";
import CartData from './cartData.jsx';

function Cart({ cart }) {
  if (!cart || cart.length === 0) {
    return (
      <div className="shopping-cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        
        <CartItem key={item.id} item={item} />
        
      ))}
      <CartData cart={cart} />
    </div>
  );
}

export default Cart;


