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

  const handleClick = () => {
    setIsClicked(true);
  }

  const handleBudget = (e) => {
    setBudget(parseInt(e.target.value, 10));
  }



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
  const addToCart = (item) => {
    console.log("here")
    if (budget >= item.price) {
      setCart([...cart, item]);
      setBudget(budget - item.price);
    } else {
      alert('You have exceeded your budget');
    }
  };
  const handleMenuItemClick = (item) => {
    addToCart(item);
  };

  const handleBudgetChange = (item) => {
    if (budget > 0) {
      setBudget(budget - item.price)
      console.log(budget)
    }
    else {

      console.log("You don't have enough budget!")
    }
    

  }
  if(budget <0) {
    alert("no enough dibero")
  }


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
      <div>
        <h1 onClick={() => handleClick()}>Click here to get Started for budget Planner</h1>
        <div>
          {isClick ? (
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
        <div className="menu-items">


          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              setBudget={handleBudgetChange}
            />

          ))}
        </div>
      </div>
    </div>

  )

}

export default Menu;