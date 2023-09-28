import React, { useState, useEffect } from "react";
import FoodContainer from "../Components/FoodContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../style/review.css";
import '../style/AdminMenu.css';
import { getDocs, collection } from 'firebase/firestore'
import { db} from '../firebase.js'
import Comment from '../Components/Comments'; 
import man from '../Assets/users-icon/man.png'; 
import girl from '../Assets/users-icon/girl.png'; 
import hacker from '../Assets/users-icon/hacker.png'; 


export default function Reviews() {
  const [menuItems, setMenuItems] = useState([]);
  const [showMore, setShowMore]= useState(false); 
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
    const menuItemtoRender = showMore ? menuItems: menuItems.slice(0,3); 


  return (
    <div>
      <Header />
      {menuItems.length ? (
        <>
          <div className="menu-items">
            <div className="review-container">
              <div className="review-row">
                {menuItemtoRender.map((item) => (
                  <FoodContainer key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="show-more">
            <button
              className="show-more-btn"
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              {" "}
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>
          <br />
          <br />
          <div className="feedback-container">
            <div className="feedback-form">
              <h1>Provide us your feedback</h1>
              <form action="">
                <label for="name">Your name:</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name..."
                />
                <br />
                <label for="email">Email:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email..."
                />
                <br />
                <label for="feedback">Your Feedback:</label>
                <br />
                <input
                  type="text"
                  id="feedback"
                  name="feedback"
                  placeholder="Tell us your thoughts..."
                />
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
          <div className="comments-section">
            <hr></hr>
            <h2>User Comments</h2>
            <Comment
              username="John Doe"
              rating={5}
              comment=" I sure do love to have some Coca-Cola! It's the perfect drink to cool me down during those hot Texas summers. The sweet, caramel flavor pairs perfectly with a juicy barbecue brisket sandwich or some spicy Tex-Mex. And let's not forget about those glass bottles - there's just something special about cracking one open with my buddies while sitting on the porch. Coca-Cola is a true Texas tradition, y'all!"
              imageSrc={man}
              date="March 23rd, 2023"
            />
            <Comment
              username="John Wick"
              rating={4}
              comment=" I certainly love Coca-Cola! It's the perfect drink to cool me down during those hot Texas summers. The sweet, caramel flavor pairs perfectly with a juicy barbecue brisket sandwich or some spicy Tex-Mex. And let's not forget about those glass bottles - there's just something special about cracking one open with my buddies while sitting on the porch. Coca-Cola is a true Texas tradition, y'all!"
              imageSrc={hacker}
              date="April 5th, 2023"
            />

            <Comment
              username="Katie Holmes"
              rating={3}
              comment=" Absolutely love to sip some Coca-Cola during those hot Texas summers. The sweet, caramel flavor pairs perfectly with a juicy barbecue brisket sandwich or some spicy Tex-Mex. And let's not forget about those glass bottles - there's just something special about cracking one open with my buddies while sitting on the porch. Coca-Cola is a true Texas tradition, y'all!"
              imageSrc={girl}
              date="January 3rd, 2023"
            />
          </div>
          <Footer />
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}