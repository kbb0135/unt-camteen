import React, { useState, useEffect } from "react";
import FoodContainer from "../Components/FoodContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../style/review.css";
import '../style/Menu.css';

import Feedback from "../Components/FeedBack";

// ** Services
import { fetchData } from "../services/foods";

const categories = ['Side', 'Entrees', 'Desert', 'Drink']
export default function Reviews() {
  const [menuItems, setMenuItems] = useState([]);
  const [showMore, setShowMore]= useState(false); 
 

  // ** Fetch data from db parallely
  const makeApiReq = async() => {
    Promise.all(categories.map(category => 
      fetchData({collectionName: category})
    )).then(responses => {
      setMenuItems(responses.flat())
    })
  }

   // as the state changes
  useEffect(() => {
    makeApiReq()
  }, []);

    const menuItemtoRender = showMore ? menuItems: menuItems.slice(0,3); 

  return (
    <div>
      <Header />
      {menuItems.length ? (
        <>
          <div className="menu-items">
            <div className="review-container">
              <div className="food-section">
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
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>
          <br />
          <br />
          <Feedback />
          <Footer />
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}