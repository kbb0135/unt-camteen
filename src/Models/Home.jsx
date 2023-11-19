import React from "react";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";
import { FaShield, FaMoneyCheckDollar, FaFire, FaUser, FaArrowRight } from "react-icons/fa6";
import Burger from "../Assets/burger.png";
import DPMarket from "../Assets/DPMarket.jpg";
import DPGrill from "../Assets/DPGrill.jpg";
import Coffee from "../Assets/choco.jpg";
import QualityStar from "../Assets/quali.png";
import AwardMedal from "../Assets/medal.png";
import Dessert from "../Assets/dessert.jpg";
import Beverage from "../Assets/beverage.jpg";
import Side from "../Assets/side.jpg"
import Entree from "../Assets/entree.jpg"
import Pasta from "../Assets/pasta.jpg"
import { Link } from "react-router-dom";
// import {db} from '../firebase.js'
// import {
//      getDoc, doc
// } from 'firebase/firestore'

//This is reference to get the data from firestore
function Home() {
  const navigate = useNavigate();
  // const getData =async() => {
  //   const colRef = doc(db, "Drink", "sprite")
  //   const docSnap = await getDoc(colRef);
  //   console.log(docSnap.data().Name)
  //   // getDocs(colRef)
  //   // .then((snapshot) => {
  //   //     //console.log(snapshot.docs)
  //   //     let drink = [];
  //   //     snapshot.docs.forEach((doc) => {
  //   //       drink.push({...doc.data(),id: doc.id})
  //   //     })
  //   //     // console.log(drink)
  //   //     console.log(drink[1].Name)

  //   // })
  //   // .catch((error) => {
  //   //   console.log(error)

  //   // })
  //   // var userCollection = db.collection()
  // }

  return (
    <>
      <div className="hero">
        <div className="slogan">
          <span>It's about the food</span>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            justo ac libero interdum aliquet. Fusce varius mauris a metus
            consequat, quis rhoncus risus elementum
          </p>
        </div>
        <div>
          {" "}
          <img src={Burger} alt="A Burger" />
        </div>
        <div>
          {" "}
          <img src={Coffee} alt="Coffee cup" />
        </div>
        <div>
          <button
            type="button"
            className="primary-button large-button sharp-button"
            onClick={() => {
              navigate("/menu");
            }}
          >
            Order Online
          </button>
          <button
            type="button"
            className="ghost-button large-button sharp-button"
            onClick={() => {
              navigate("/auth/signup");
            }}
          >
            Sign Up
          </button>
        </div>{" "}
        <div>
          <img src={Pasta} alt="Pasta dish" />
        </div>
        <div>
          <img className="icon" src={AwardMedal} alt="Award Medal Icon"></img>
          <h4>Awards-winning Food</h4>
          <p>
            The UNT Canteen is a part of UNT Dining Services, a
            multi-award-winning college dining service in the U.S.
            <br/>
            <Link to="https://dining.unt.edu/our-story/">Discover more <FaArrowRight/></Link>
          </p>
        </div>
        <div>
          <img className="icon" src={QualityStar} alt="Quality Icon"></img>
          <h4>Quality Ingredients</h4>
          <p>
            Prepared with top-quality ingredients, we offer flavorful and
            nutritious dishes that promote your overall well-being
          </p>
        </div>
        <div>
          <h2>Discover our special features </h2>
          <div className="feature">
            <span>
              <FaShield />
              <h4>Online Ordering</h4>
              <p>Order online and pickup later with our secured checkout</p>
            </span>
            <span>
              <FaMoneyCheckDollar />
              <h4>Budget Planner</h4>
              <p>
                Simply enter a budget, and our tool will let you know when the
                total cost exceed your budget{" "}
              </p>
            </span>
            <span>
              <FaFire />
              <h4>Nutrition Tracker</h4>
              <p>
                Explore our meal-specific nutrition details that will help you
                easily keep track of your dietary goal
              </p>
            </span>
          </div>
        </div>
        <div className="hours">
          <span className="hours-closed">
            <img
              src={DPMarket}
              alt="Discovery Perks Market Coffee and Snack Shop"
            />
          </span>
          <div>
            <h2>Discovery Perks Market</h2>
            <p>
              Discover the perfect blend at Discovery Perk Market, your spot for
              coffee, beverages, snacks, and refreshing cold bites
            </p>
            <h3>Open Hours </h3>
            <p>Mondays - Thursday: 7:30 a.m. - 7:00 p.m.</p>
            <p>Fridays: 7:30 a.m. - 2:00 p.m.</p>
            <p>Weekends: Closed</p>
            {/* <button
              type="button"
              className="primary-button large-button"
              onClick={() => navigate("/menu")}
            >
              Shop Discovery Perks Market
            </button> */}
          </div>
        </div>
        <div className="hours">
          <div>
            <h2>Discovery Perks Grill</h2>
            <p>
              Explore flavor-packed goodness at Discovery Perks Grill, your
              hotspot for hot and fresh food that fuel your energy
            </p>
            <h3>Open Hours </h3>
            <p>Mondays - Thursday: 7:30 a.m. - 5:00 p.m.</p>
            <p>Fridays: 7:30 a.m. - 2:00 p.m.</p>
            <p>Weekends: Closed</p>
            {/* <button
              type="button"
              className="primary-button large-button"
              onClick={() => navigate("/menu")}
            >
              Shop Discovery Perks Grill
            </button> */}
          </div>
          <span className="hours-open">
            <img
              src={DPGrill}
              alt="Discovery Perks Market Coffee and Snack Shop"
            />
          </span>
        </div>
        <div className="shop">
          <h2>Order by category</h2>
          <div>
            <img src={Entree} />
            <span>
              Order Entree <FaArrowRight />
            </span>
          </div>
          <div>
            <img src={Side} />
            <span>
              Order Side
              <FaArrowRight />
            </span>
          </div>
          <div>
            <img src={Beverage} />
            <span>
              Order Beverage
              <FaArrowRight />
            </span>
          </div>
          <div>
            <img src={Dessert} />
            <span>
              Order Dessert
              <FaArrowRight />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
