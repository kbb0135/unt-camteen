import React, { useState, useEffect } from "react";
import FoodContainer from "../Components/FoodContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../style/review.css";
import '../style/AdminMenu.css';
import { getDocs, collection } from 'firebase/firestore'
import { db} from '../firebase.js'



export default function Reviews() {
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
        image: doc.data().ImageURL
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
        image: doc.data().ImageURL
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
        quantity: doc.data().quantity
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
      <Header />
      <div className="menu-items">
        <div className="review-container">
          <div className="review-row">

            {menuItems.map((item) => (
              <FoodContainer
                key={item.id}
                item={item}
              />
            ))}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}