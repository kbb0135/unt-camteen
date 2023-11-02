import React from 'react';
import { db } from '../firebase.js'
import { getDocs, collection } from 'firebase/firestore'
import '../style/MenuItem.css';
import image from '../Assets/Coke.png';
function MenuItem() {
 /* const [menuItems, setMenuItems] = useState([]);
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
    }
    catch (error) {
      alert(error);
      return [];
    }
 */       
  return (
    <div className='menu-item-body'>
      <div className='menu-item-pic'>
        <img src={image}></img>
      </div>
      <div className='menu-item-info'>
        <h3>By Discovery Perks Market</h3>
        <h1>Coke</h1>
        <h1>$1.50</h1>
        <h3>Item Description</h3>
        <p>owgrngoipenrgionrewgwnepoir owgrngoipenrgionrewgwnepoir owgrngoipenrgionrewgwnepoir</p>
        <h3>Nutrition Information</h3>
        <div className='menu-item-cal-box'>
          <h3>Calories Per Each</h3>
          <h3>139</h3>
          <p>owgrngoipenrgionrewgwnepoir owgrngoipenrgionrewgwnepoir owgrngoipenrgionrewgwnepoir</p>
        </div>
      </div>
    </div>

  );
  }
 

  



export default MenuItem;