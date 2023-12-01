import React, { useState, useEffect } from "react";
import MenuItemCard from "../Components/MenuItemCard";
import "../style/style.css";
import "../style/Menu.css";
import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";
function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [budget, setBudget] = useState();
  const [isBudgetSet, setIsBudgetSet] = useState(false);
  const [isDisplayEntree, setDisplayEntree] = useState(true);
  const [isDisplaySide, setDisplaySide] = useState(true);
  const [isDisplayDrink, setDisplayDrink] = useState(true);
  const [isDisplayDessert, setDisplayDessert] = useState(true);
  const addToCartWithoutBudget = (item) => {
    setCart([...cart, item]);
  };

  const handleBudgetChange = (item, e) => {
    setBudget((prevBudget) => {
      const updatedBudget = prevBudget - item.price;
      if (updatedBudget >= 0) {
        // Update budget only if it's not negative
        return updatedBudget;
      } else {
        alert("You don't have enough budget!");
        // Revert to the previous budget value if it would become negative
        return prevBudget;
      }
    });
  };

  const getMenuItems = async (category) => {
    try {
      const snapshot = await getDocs(collection(db, category));
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category,
      }));
      return result;
    } catch (error) {
      alert(error);
      return [];
    }
  };
  //use effect feature to update the item as soon
  // as the state changes
  useEffect(() => {
    //getting all menu items and setting them to state
    const setData = async () => {
      const desertData = isDisplayDessert ? await getMenuItems("Desert") : [];
      const entreesData = isDisplayEntree ? await getMenuItems("Entrees") : [];
      const sideData = isDisplaySide ? await getMenuItems("Side") : [];
      const drinkData = isDisplayDrink ? await getMenuItems("Drink") : [];
      const mergeData = [
        ...entreesData,
        ...desertData,
        ...sideData,
        ...drinkData,
      ];
      if (mergeData.length >= 0) {
        setMenuItems(mergeData);
      }
    };

    setData();
  }, [isDisplayDessert, isDisplayDrink, isDisplayEntree, isDisplaySide]);

  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="budget-planner">
        <label htmlFor="budget">Budget Planner</label>
        <input type="text" placeholder="Enter your budget $" value={budget} onChange={(e)=> parseInt(e.target.value,10)}></input>
      </div>
      <div className="menu-filter">
        <h3>Category:</h3>
        <span className="category-filter">  
          <label htmlFor="Entree">Entree</label>
          <input
            id="Entree"
            type="checkbox"
            defaultChecked={isDisplayEntree}
            onClick={() => {
              setDisplayEntree((prev)=> !prev);
            }}
          />
        </span>{" "}
        <span className="category-filter">
          <label htmlFor="Side">Side</label>
          <input
            id="Side"
            type="checkbox"
            defaultChecked={isDisplaySide}
            onClick={() => {
              setDisplaySide((prev) => !prev);
            }}
          />
        </span>{" "}
        <span className="category-filter">
          <label htmlFor="Beverage">Beverage</label>
          <input
            id="Beverage"
            type="checkbox"
            defaultChecked={isDisplayDrink}
            onClick={() => {
              setDisplayDrink((prev) => !prev);
            }}
          />
        </span>{" "}
        <span className="category-filter">
          <label htmlFor="Dessert">Dessert</label>
          <input
            id="Dessert"
            type="checkbox"
            defaultChecked={isDisplayDessert}
            onClick={() => {
              setDisplayDessert((prev) => !prev);
              console.log(isDisplayDessert)
            }}
          />
        </span>
      </div>

      <div className="menu-items">
        {menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            setBudget={handleBudgetChange}
            budget={budget}
            isBudgetSet={isBudgetSet}
            addToCartWithoutBudget={addToCartWithoutBudget}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
