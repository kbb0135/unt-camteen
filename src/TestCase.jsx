import React, { useState, useEffect } from 'react';
import './style/style.css';
import './style/AdminMenu.css';
import MenuItem from './MenuItem.jsx';
import ItemForm from './Admin/ItemForm';
import { db } from './firebase.js';
import { getDocs, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import NavBar from "./Admin/NavBar.jsx";
import Footer from './Components/Footer';
import UNTBar from './Components/UNTBar';
import ItemEditor from './ItemEditor';

export default function TestCase() {
  const [menuItems, setMenuItems] = useState([]);
  const [nutritionalValues, setNutritionalValues] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleCloseDetailView = () => {
    setSelectedItemId(null);
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
        image: doc.data().ImageURL,
        category: doc.data().category
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
        image: doc.data().ImageURL,
        category: doc.data().category
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
        image: doc.data().ImageURL,
        category: doc.data().category

      }));
      console.log(snapshot)
      return desert;

    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const setData = async () => {
      const desertData = await getDesert();
      const entreesData = await getEntrees();
      const sideData = await getSide();
      const drinkData = await getDrink();
      const mergeData = [...entreesData, ...desertData, ...sideData, ...drinkData];

      // Combine menu items with nutritional values from local storage
      const itemsWithNutritionalValues = mergeData.map((item) => ({
        ...item,
        nutritionalValues: JSON.parse(localStorage.getItem(item.id)) || {},
      }));

      if (itemsWithNutritionalValues.length > 0) {
        setMenuItems(itemsWithNutritionalValues);
      }
    };

    setData();
  }, []);

  const handleDelete = async (itemId) => {
    const deleteIndex = menuItems.findIndex((item) => item.id === itemId);
    const storage = getStorage();

    if (deleteIndex !== -1) {
      const deletedItem = menuItems[deleteIndex];
      const updatedMenuItems = menuItems.filter((item) => item.id !== itemId);
      await deleteDoc(doc(db, deletedItem.category, deletedItem.id));
      const img = ref(storage, deletedItem.id);

      deleteObject(img)
        .then(() => {
          console.log("Image deleted");
        })
        .catch((error) => {
          console.log("Error deleting image", error);
        });

      setMenuItems(updatedMenuItems);
      console.log("Deleted Item:", deletedItem);
      console.log("Item deleted from Firestore");
    }
  };

  const handleAdd = async (newItem) => {
    const updatedMenuItems = [...menuItems, newItem];
    setMenuItems(updatedMenuItems);

    // Save the updated menuItems to local storage
    localStorage.setItem(newItem.id, JSON.stringify({}));

    setIsFormOpen(false);
  };

  const handleEdit = async (editedItem) => {
    const dataValue = {
      id: " ",
      category: " ",
    };
    const updatedItems = menuItems.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );

    const data = menuItems.map((item) => {
      if (item.id === editedItem.id) {
        dataValue.id = item.id;
        dataValue.category = item.category;
        return editedItem;
      } else {
        return item;
      }
    });

    if (editedItem.price > 0 && editedItem.name) {
      const editData = doc(db, dataValue.category, dataValue.id);
      try {
        await updateDoc(editData, {
          Name: editedItem.name,
          Price: editedItem.price,
        });

        setMenuItems(updatedItems);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill out the form carefully");
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <UNTBar />
      <NavBar />
      <div className="menu">
        <h1>UNT-Canteen</h1>
        {/* ... */}
        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id}>
              <MenuItem
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onClick={() => handleItemClick(item.id)}
              />
              {selectedItemId === item.id && (
                <ItemEditor
                  itemId={item.id}
                  onClose={handleCloseDetailView}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
