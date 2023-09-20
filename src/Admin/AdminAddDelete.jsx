import React, { useState, useEffect } from 'react';
import '../style.css';
import './AdminMenu.css';
import MenuItem from './MenuItem.jsx';
import ItemForm from './ItemForm';
import { db } from '../firebase.js'
import { getDocs, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";


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

  const handleDelete = async(itemId) => {
    // Remove the item from menuItems
    const deleteIndex = menuItems.findIndex((item) => item.id === itemId);
    const storage = getStorage();
    
    
    if (deleteIndex !== -1) {
      const deletedItem = menuItems[deleteIndex];
      const updatedMenuItems = menuItems.filter((item) => item.id !== itemId);
      await deleteDoc(doc(db, deletedItem.category, deletedItem.id))
      const img = ref(storage, deletedItem.id);
      deleteObject(img).then(()=> {
        console.log("image deleted");
      })
      .catch ((error)=> {
        console.log ("Error deleting image", error );
      })
      setMenuItems(updatedMenuItems);
      console.log("Deleted Item:", deletedItem);
      console.log("Item deleted from firestore");
    }

  };

  const handleAdd = async(newItem) => {
    // Add the new item to menuItems
    const updatedMenuItems = [...menuItems, newItem];
   
    setMenuItems(updatedMenuItems);
    setIsFormOpen(false);

    // Save the updated menuItems to local storage
    // saveMenuItem(updatedMenuItems);
  };

  const handleEdit = async(editedItem) => {
    const dataValue = ({
      id: " ",
      category: " "
    })
    const updatedItems = menuItems.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
   
    const data = menuItems.map((item) => {
      if(item.id === editedItem.id) {
        dataValue.id = item.id
        dataValue.category=item.category
        console.log("edited item ="+item.id);
        return editedItem
      }
      else {
        return item
      }
    }
    
      
    ); 
    if (editedItem.price > 0 && editedItem.name) {
      // console.log("editedItem" +editedItem.price)
      // console.log(editedItem.name)
      // console.log("categories = "+editedItem.category)
      // console.log(editedItem.id)
      // console.log("Menu ="+data.useId)
      // console.log(editedItem.image)
      const editData = doc(db, dataValue.category, dataValue.id);
      console.log("dataValue"+dataValue.id)
      console.log("dataValue"+dataValue.category)
      try {
        await updateDoc(editData, {
          Name: editedItem.name,
          Price: editedItem.price
  
        })
  
  
        setMenuItems(updatedItems);
      }
      catch(error) {
        console.log(error)
      }
     

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
