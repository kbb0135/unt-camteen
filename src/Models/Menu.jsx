import React, { useState, useEffect } from 'react';
import MenuItemCard from '../Components/MenuItemCard';
import '../style/style.css';
import '../style/Menu.css';
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

  const getMenuItems = async (category) => {
    try {
      const snapshot = await getDocs(collection(db, category));
      const result = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category
      }));
      return result;
    }
    catch (error) {
      alert(error);
      return [];
    }
  }
  //use effect feature to update the item as soon
  // as the state changes
  useEffect(() => {
    //getting all menu items and setting them to state
    const setData = async () => {
      const desertData = await getMenuItems("Desert");
      const entreesData = await getMenuItems("Entrees");
      const sideData = await getMenuItems("Side");
      const drinkData = await getMenuItems("Drink");
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

    <div className='menu'>
      <h2>Menu</h2>
      <div className='menu-items'>
            {menuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  setBudget={handleBudgetChange}
                  budget={budget}
                  isBudgetSet={isBudgetSet}
                  addToCartWithoutBudget={addToCartWithoutBudget}
                />
            ))
        }
        </div>
    </div>
  )
}

export default Menu;