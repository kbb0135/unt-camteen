import React, { useState, useEffect } from 'react';
import MenuItemCard from '../Components/MenuItemCard';
import '../style/style.css';
import '../style/AdminMenu.css';
import { db } from '../firebase.js'
import { getDocs, collection } from 'firebase/firestore'
function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [budget, setBudget] = useState(0);
  const [isClick, setIsClicked] = useState(false);
  const [isBudgetSet, setIsBudgetSet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setIsBudgetSet(true)
    setIsOpen(prevOpen => !prevOpen);

    if (!isOpen) {

    }
    else {
      const confirmClose = window.confirm('Are you sure you want to close the budget planner? Progress will be lost!');
      if (confirmClose) {
        setIsOpen(false);
        setBudget(0);
      }

    }

  }

  const handleBudget = (e) => {
    setBudget(parseInt(e.target.value));
  }

  const addToCartWithoutBudget = (item) => {
    setCart([...cart, item]);
  }

  const handleBudgetChange = (item, e) => {
    setBudget(prevBudget => {
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

  const getEntrees = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Entrees"));
      const entrees = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category
      }));
      return entrees;
    }
    catch (error) {
      alert(error);
      return [];
    }

  };
  //getting side dishes from the collection
  const getSide = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Side"));
      const sides = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category
      }));
      return sides;
    } catch (error) {
      alert(error);
      return [];
    }
  };
  //getting drinks from the collection
  const getDrink = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Drink"));
      const drink = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category
      }));
      return drink;
    } catch (error) {
      alert(error);
      return [];
    }
  };
  //geting the desert from the collection
  const getDesert = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Desert"));
      const desert = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        quantity: doc.data().quantity,
        category: doc.data().category
      }));
      return desert;
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
      const desertData = await getDesert();
      const entreesData = await getEntrees();
      const sideData = await getSide();
      const drinkData = await getDrink();
      const mergeData =
        [...entreesData,
        ...desertData,
        ...sideData,
        ...drinkData
        ];
      if (mergeData.length > 0) {
        setMenuItems(mergeData);
        // console.log('fetched entree data', mergeData)
      };
    }

    setData()
  }, []);



  return (

    <div>
      <h1 className="click-Handle" onClick={handleClick}>
        {isOpen ? "Click Here to Close the Budget Planner" : "Click here to get Started for budget Planner"}
      </h1>
      <div>
        {isOpen && isClick ? (
          <>
            <h1>Enter you budget:{budget.toFixed(2)}</h1>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={budget}
              onChange={handleBudget}
            />
          </>
        ) : (
          <></>
        )
        }
      </div>
      <div className='menu-items'>
        <div className='review-container'>
          <div className='food-section'>
            {menuItems.map((item) => (
              <div>
                <MenuItemCard
                  key={item.id}
                  item={item}
                  setBudget={handleBudgetChange}
                  budget={budget}
                  isBudgetSet={isBudgetSet}
                  addToCartWithoutBudget={addToCartWithoutBudget}


                />
              </div>
            ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu;