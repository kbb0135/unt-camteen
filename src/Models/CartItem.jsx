import React from 'react';

function CartItem({ item }) {
  // Convert item.price to a number if it's a string
  const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;

  return (
    <div className="cart-item">
      <span>{item.name}</span>
      <span>Quantity: {item.quantity}</span>
      <span>Total: ${price.toFixed(2)}</span>
    </div>
  );
}

export default CartItem;
