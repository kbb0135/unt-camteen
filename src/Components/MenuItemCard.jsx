import React, { useState } from "react";
import { useCart } from "../Models/CartContext";
import { Notifier } from "./Notifier";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "../style/style.css";

const MenuItemCard = ({
  item,
  setBudget,
  budget,
  isBudgetSet,
  addToCartWithoutBudget,
}) => {
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");

      const handleAddToCart = () => {
          if (isBudgetSet) {
              if (item.price <= 0) {
                  alert('Item price should be greater than 0 to add to cart.');
              } else {
                  if (budget - item.price >= 0) {
                      addToCart(item);
                      setMessage('Added to cart!!');
                      setBudget(item);
                      console.log("Here");
                  } else {
                      // setMessage("You don't have enough budget!");
                      alert("You do not have enough budget!");
                  }
              }
          } else {
              //if budget is not set, call this function directly
              addToCartWithoutBudget(addToCart(item));
              setMessage('Item Added to Cart');
          }
      };
  return (
    <div className="menu-card">
      <Link to={`/reviews/${item.category}/${item.id}`}>
        <img src={item.image} alt={item.name} className="food-img" />
      </Link>
      <div className="menu-card-content">
        <span>{item.name}</span>
        <span className="menu-card-price">&#x24;{item.price}</span>
        <div>
          <button
            className="outline-button plain-button small-button"
            onClick={handleAddToCart}
          >
            Add to Cart <FaPlus />
          </button>
          <Notifier message={message} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
};
export default MenuItemCard; 