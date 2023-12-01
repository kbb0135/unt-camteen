import React, { useState, useEffect } from "react";
import "../style/style.css";
import "../style/Menu.css";
import MenuItem from "./MenuItem.jsx";
import ItemForm from "./ItemForm";
import { db } from "../firebase.js";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import NavBar from "./NavBar.jsx";

export default function AdminAddDelete() {
  const [menuItems, setMenuItems] = useState([]);
  //getting entrees from the collection
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
      const desertData = await getMenuItems("Desert");
      const entreesData = await getMenuItems("Entrees");
      const sideData = await getMenuItems("Side");
      const drinkData = await getMenuItems("Drink");
      const mergeData = [
        ...entreesData,
        ...desertData,
        ...sideData,
        ...drinkData,
      ];
      if (mergeData.length > 0) {
        setMenuItems(mergeData);
        // console.log('fetched entree data', mergeData)
      }
    };

    setData();
  }, []);

  // const saveMenuItem = (menuItems) => {
  //   localStorage.setItem('menuItems', JSON.stringify(menuItems));
  // };

  const handleDelete = async (itemId) => {
    // Remove the item from menuItems
    const deleteIndex = menuItems.findIndex((item) => item.id === itemId);
    const storage = getStorage();

    if (deleteIndex !== -1) {
      const deletedItem = menuItems[deleteIndex];
      const updatedMenuItems = menuItems.filter((item) => item.id !== itemId);
      await deleteDoc(doc(db, deletedItem.category, deletedItem.id));
      const img = ref(storage, deletedItem.id);
      deleteObject(img)
        .then(() => {
          console.log("image deleted");
        })
        .catch((error) => {
          console.log("Error deleting image", error);
        });
      setMenuItems(updatedMenuItems);
      console.log("Deleted Item:", deletedItem);
      console.log("Item deleted from firestore");
    }
  };

  const handleAdd = async (newItem) => {
    // Add the new item to menuItems
    const updatedMenuItems = [...menuItems, newItem];

    setMenuItems(updatedMenuItems);
    setIsFormOpen(false);

    // Save the updated menuItems to local storage
    // saveMenuItem(updatedMenuItems);
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
        // console.log("edited item ="+item.id);
        return editedItem;
      } else {
        return item;
      }
    });
    if (editedItem.price > 0 && editedItem.name) {
      console.log(data);
      // console.log("editedItem" +editedItem.price)
      // console.log(editedItem.name)
      // console.log("categories = "+editedItem.category)
      // console.log(editedItem.id)
      // console.log("Menu ="+data.useId)
      // console.log(editedItem.image)
      const editData = doc(db, dataValue.category, dataValue.id);
      console.log("dataValue" + dataValue.id);
      console.log("dataValue" + dataValue.category);
      try {
        await updateDoc(editData, {
          Name: editedItem.name,
          Price: editedItem.price,
        });

        setMenuItems(updatedItems);
      } catch (error) {
        console.log(error);
      }

      // Save the updated menuItems to local storage
      // saveMenuItem(updatedItems);
    } else {
      alert("Please fill out the form carefully");
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="menu">
        <h2>Menu Edit</h2>
        <button
          className="primary-button"
          onClick={async () => setIsFormOpen(true)}
        >
          Add New Item
        </button>
        {isFormOpen && <ItemForm onAdd={handleAdd} setIsFormOpen={ setIsFormOpen} />}
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
      <Footer />
    </div>
  );
}
