import React,{useState, useEffect} from 'react';
import MenuItem from '../Components/MenuItem';
import '../style.css';
import '../Admin/AdminMenu.css';
import {db} from '../firebase.js'
import { getDocs, collection } from 'firebase/firestore'
function Menu() {
    const [menuItems, setMenuItems] = useState([]);
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
            console.log('fetched entree data', mergeData)
          };
        }
    
        setData()
      }, []);
    return(
        <div className="menu-items">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    )
 
}

export default Menu;