import React, { useState, useEffect } from 'react';
import '../style.css';
import './AdminMenu.css';
import MenuItem from './MenuItem.jsx';
import ItemForm from './ItemForm';
import { db } from '../firebase.js'
import { getDocs, collection } from 'firebase/firestore'

export default function AdminAddDelete() {
  const [menuItems, setMenuItems] = useState([]);
  //getting entrees from the collection
  const getEntrees = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Entrees"));
      const entrees = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().Name,
        price: doc.data().Price,
        image: doc.data().ImageURL
      }));
      return entrees;
    } catch (error) {
      console.log(error);
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
        image: doc.data().ImageURL
      }));
      return sides;
    } catch (error) {
      console.log(error);
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
        image: doc.data().ImageURL
      }));
      return drink;
    } catch (error) {
      console.log(error);
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
        image: doc.data().ImageURL
      }));
      return desert;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
//use effect feature to update the item as soon
// as the state
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
        console.log('fetched entree data', mergeData)
      };
    }

    setData()
  }, []);

  // const saveMenuItem = (menuItems) => {
  //   localStorage.setItem('menuItems', JSON.stringify(menuItems));
  // };

  const handleDelete = (itemId) => {
    // Remove the item from menuItems
    const updatedMenuItems = menuItems.filter((item) => item.id !== itemId);
    setMenuItems(updatedMenuItems);

    // Save the updated menuItems to local storage
    // saveMenuItem(updatedMenuItems);
  };

  const handleAdd = (newItem) => {
    // Add the new item to menuItems
    const updatedMenuItems = [...menuItems, newItem];
    setMenuItems(updatedMenuItems);
    setIsFormOpen(false);

    // Save the updated menuItems to local storage
    // saveMenuItem(updatedMenuItems);
  };

  const handleEdit = (editedItem) => {
    const updatedItems = menuItems.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
    if (editedItem.price > 0 && editedItem.name) {
      setMenuItems(updatedItems);

      // Save the updated menuItems to local storage
      // saveMenuItem(updatedItems);
    } else {
      alert("Please fill out the form carefully");
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="menu">
      <h1>UNT-Canteen</h1>
      <button onClick={async () => setIsFormOpen(true)}>Add New Item</button>
      {isFormOpen && <ItemForm onAdd={handleAdd} />}
      <div className="menu-items">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
