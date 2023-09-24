import React from "react";
import chickenPizza from "../Assets/chicken-pizza.png";
import FoodContainer from "../Components/FoodContainer";
import GarlicButter from "../Assets/garlic-butter-chicken-wings.png";
import Kebab from "../Assets/kebab.png";
import Salmon from "../Assets/salmon.png";
import PorkChop from "../Assets/pork-chops.png";
import Steak from "../Assets/steak.png";
import SalabBowl from "../Assets/vegan-salad-bowl.png";
import ColdBrew from "../Assets/cold-brew.png";
import Frappucciono from "../Assets/frappucino.png";
import HotChocolate from "../Assets/hot-chocolate.jpeg";
import Mocha from "../Assets/mocha.jpeg";
import Americano from "../Assets/americano.png";
import Coffee from "../Assets/coffee.png";
import FrenchFries from "../Assets/french-fries.png";
import ChickenWings from "../Assets/chicken-wings.png";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../review.css";

export default function Reviews() {
  return (
    <div>
      <Header />
      <div className="review-container">
        <div className="review-row">
          <FoodContainer
            foodImage={chickenPizza}
            foodName={"Chicken Pizza"}
            rating={4.8}
            totalReviews={132}
          />
          <FoodContainer
            foodImage={GarlicButter}
            foodName={"Garlic Butter Chicken"}
            rating={4.5}
            totalReviews={90}
          />
          <FoodContainer
            foodImage={Kebab}
            foodName={"Kebab"}
            rating={5}
            totalReviews={87}
          />
        </div>
        <div className="review-row">
          <FoodContainer
            foodImage={SalabBowl}
            foodName={"Salad Bowl"}
            rating={4.2}
            totalReviews={112}
          />
          <FoodContainer
            foodName={"Salmon"}
            foodImage={Salmon}
            rating={3.7}
            totalReviews={127}
          />
          <FoodContainer
            foodName={"Chicken Wings"}
            foodImage={ChickenWings}
            rating={4.3}
            totalReviews={66}
          />
        </div>
        <div className="review-row">
          <FoodContainer
            foodImage={PorkChop}
            foodName={"Pork Chop"}
            rating={3.7}
            totalReviews={143}
          />
          <FoodContainer
            foodImage={Steak}
            foodName={"Steak"}
            rating={4.8}
            totalReviews={89}
          />
          <FoodContainer
            foodImage={FrenchFries}
            foodName={"French Fries"}
            rating={4.9}
            totalReviews={93}
          />
        </div>
        <div className="review-row">
          <FoodContainer
            foodImage={Americano}
            foodName={"Americano"}
            rating={4.7}
            totalReviews={92}
          />
          <FoodContainer
            foodImage={ColdBrew}
            foodName={"Cold Brew"}
            rating={4.6}
            totalReviews={112}
          />
          <FoodContainer
            foodImage={Frappucciono}
            foodName={"Frappucino"}
            rating={4.7}
            totalReviews={102}
          />
        </div>
        <div className="review-row">
          <FoodContainer
            foodImage={HotChocolate}
            foodName={"Hot Chocolate"}
            rating={4.7}
            totalReviews={121}
          />
          <FoodContainer
            foodImage={Mocha}
            foodName={"Mocha"}
            rating={4.3}
            totalReviews={71}
          />
          <FoodContainer
            foodImage={Coffee}
            foodName={"Coffee"}
            rating={3.5}
            totalReviews={74}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}