import React, { useState } from 'react'
import '../style.css';
import './AdminMenu.css';
import Kebab from "../Assets/kebab.png";
import Salmon from "../Assets/salmon.png";
import chickenPizza from "../Assets/chicken-pizza.png";
import ChickenWings from "../Assets/chicken-wings.png";
import MenuItem from './MenuItem.jsx';
import ItemForm from './ItemForm';
import { db, storage } from '../firebase.js'
import { Timestamp, doc, setDoc } from "firebase/firestore"


export default function AdminAddDelete() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Kebab', price: 10, image: Kebab },
    { id: 2, name: 'Salmon', price: 12, image: Salmon },
    { id: 3, name: 'Chicken Wings', price: 8, image: ChickenWings },
    { id: 4, name: 'Chicken Pizza', price: 14, image: chickenPizza },
    // Add more menu items as needed
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (itemId) => {
    setMenuItems(menuItems.filter((item) => item.id !== itemId));
  };

  const handleAdd = (newItem) => {
    setMenuItems([...menuItems, newItem]);
    setIsFormOpen(false);
  };

  const handleEdit = (editedItem) => {
    const updatedItems = menuItems.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
    setMenuItems(updatedItems);
  };

  return (
    <div className="menu">
      <h1>Restaurant Menu</h1>
      <button onClick={async() => setIsFormOpen(true)}>Add New Item</button>
      {isFormOpen && <ItemForm onAdd={handleAdd} /> }
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
};


