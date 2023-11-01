import React from "react";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";
import { FaClock, FaCalendar, FaCalculator } from "react-icons/fa6";
import Entree from "../Assets/entree.png";
import DPMarket from "../Assets/DPMarket.jpg";
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
      <div className="landing">
        <div>
          <div className="slogan">
            <span>It's about the food</span>
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              justo ac libero interdum aliquet. Fusce varius mauris a metus
              consequat, quis rhoncus risus elementum
            </p>
          </div>
          <div className="landing-button">
            <div>
              {" "}
              <img src={Entree} alt="An Entree" />
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
          </div>
        </div>
        <div>
          <img src={Entree} alt="An Entree" />
        </div>
      </div>
      <div className="open-hours">
        <div>
          <span className="hour-des">
            <h3> Discovery Park Market</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
            <span>
              {" "}
              <h4>Open hours:</h4>
              <p>
                {" "}
                Mon-Thu: 7:30 a.m. - 7:00 p.m. <br /> Fri: 7:30 a.m. - 2:00 p.m.{" "}
                <br /> Weekend: Closed.
              </p>
            </span>
          </span>
          <img src={DPMarket} alt="discovery grill" />
        </div>
        <div>
          <img src={DPMarket} alt="discovery grill" />
          <span className="hour-des">
            <h3> Discovery Park Market</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
            <span>
              {" "}
              <h4>Open hours:</h4>
              <p>
                {" "}
                Mon-Thu: 7:30 a.m. - 7:00 p.m. <br /> Fri: 7:30 a.m. - 2:00 p.m.{" "}
                <br /> Weekend: Closed.
              </p>
            </span>
          </span>
        </div>
      </div>

      {/* <div className="feature">
          <FaClock />
          <span>
            <span>Online Order</span>
            <p>Order online and pickup after classes</p>
          </span>
        </div>
        <div className="feature">
          <FaCalculator />
          <span>
            <span>Calories Tracker</span>
            <p>
              Track your calories intake using our nutrition table that come
              with every meal
            </p>
          </span>
        </div>
        <div className="feature">
          <FaCalendar />
          <span>
            <span>Meal Planner</span>
            <p>
              Our meal planner will help you plan your favorite meals with a
              budget{" "}
            </p>
          </span>
        </div> */}
    </>
  );
}

export default Home;
