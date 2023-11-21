import React, { useState, useEffect } from 'react';
import MenuItemCard from '../Components/MenuItemCard';
import '../style/style.css';
import '../style/AdminMenu.css';
import { db } from '../firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import Header from '../Components/Header.jsx';
import { useLocation, useParams } from 'react-router-dom';

function OrderCategory() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const { category } = useParams();
  const [cart, setCart] = useState([]);

  const getEntrees = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Entrees'));
      const entrees = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category,
      }));
      return entrees;
    } catch (error) {
      alert(error);
      return [];
    }
  };

  const getSide = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Side'));
      const sides = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category,
      }));
      return sides;
    } catch (error) {
      alert(error);
      return [];
    }
  };

  const getDrink = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Drink'));
      const drink = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        category: doc.data().category,
      }));
      return drink;
    } catch (error) {
      alert(error);
      return [];
    }
  };

  const getDesert = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Desert'));
      const desert = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL,
        quantity: doc.data().quantity,
        category: doc.data().category,
      }));
      return desert;
    } catch (error) {
      alert(error);
      return [];
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entreesData = await getEntrees();
        const sideData = await getSide();
        const drinkData = await getDrink();
        const desertData = await getDesert();

        const allItems = [
          { category: 'Entrees', items: entreesData },
          { category: 'Side', items: sideData },
          { category: 'Drink', items: drinkData },
          { category: 'Desert', items: desertData },
        ];

        setMenuItems(allItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (item) => {
    console.log("here")
      setCart([...cart, item]);
  };

  return (
    <div>
      <Header />
      <div className="category-buttons">
        <button onClick={() => handleCategorySelect('Entrees')}>Entrees</button>
        <button onClick={() => handleCategorySelect('Side')}>Sides</button>
        <button onClick={() => handleCategorySelect('Drink')}>Drinks</button>
        <button onClick={() => handleCategorySelect('Desert')}>Desserts</button>
      </div>

      <div className="menu-items">
        {menuItems.map((categoryData) => {
          if (selectedCategory === categoryData.category) {
            return (
              <div key={categoryData.category}>
                <h2>{categoryData.category}</h2>
                {categoryData.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default OrderCategory;
