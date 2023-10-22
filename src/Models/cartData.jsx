import React from 'react';
import CartItem from './CartItem';

function CartData({ cart }) {
  return (
    <div className="shopping-cart">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartData;
