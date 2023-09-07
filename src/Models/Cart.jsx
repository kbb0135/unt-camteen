import React from 'react'; 
import "../style.css"; 
import chickenPizza from "../Assets/chicken-pizza.png"; 
import GarlicButter from "../Assets/garlic-butter-chicken-wings.png"; 
import Kebab from "../Assets/kebab.png"; 
import Salmon from "../Assets/salmon.png"; 
import SaladBowl from "../Assets/vegan-salad-bowl.png"; 
import ChickenWings from "../Assets/chicken-wings.png"; 
import Header from "../Components/Header"; 
import Footer from "../Components/Footer"; 
import CartContainer from "../Components/CartContainer"; 
import {cartData} from "../Models/cartData"; 

function Cart() {
    var totalCalories = 0; 
    var totalPrice = 0; 

    for (let items in cartData) {
        totalCalories = totalCalories + cartData[items].quantity * cartData[items].calorie; 
        totalPrice = totalPrice + cartData[items].price; 
    }

    return (
        <div>
            <Header />
            <div className= "cart-container">
                <div className='review-row'>
                    <CartContainer
                        foodImage= {chickenPizza} 
                        foodName = {"Chicken Pizza"}
                        foodAmount = {cartData["chicken pizza"].quantity}
                        foodCalorie={cartData["chicken pizza"].calorie}
                        foodPrice = {cartData["chicken pizza"].price}
                    />
                    <CartContainer
                        foodImage= {GarlicButter} 
                        foodName = {"Garlic Butter Chicken"}
                        foodAmount = {cartData["garlic butter chicken"].quantity}
                        foodCalorie={cartData["garlic butter chicken"].calorie}
                        foodPrice = {cartData["garlic butter chicken"].price}
                    />
                    <CartContainer
                        foodImage= {Kebab} 
                        foodName = {"Chicken Kebab"}
                        foodAmount = {cartData["kebab"].quantity}
                        foodCalorie={cartData["kebab"].calorie}
                        foodPrice = {cartData["kebab"].price}
                    />
                </div>
                <div className='review-row'>
                    <CartContainer
                        foodImage= {SaladBowl} 
                        foodName = {"Salad Bowl"}
                        foodAmount = {cartData["salad bowl"].quantity}
                        foodCalorie={cartData["salad bowl"].calorie}
                        foodPrice = {cartData["salad bowl"].price}
                    />
                    <CartContainer
                        foodImage= {Salmon} 
                        foodName = {"Salmon"}
                        foodAmount = {cartData["salmon"].quantity}
                        foodCalorie={cartData["salmon"].calorie}
                        foodPrice = {cartData["salmon"].price}
                    />
                    <CartContainer
                        foodImage= {ChickenWings} 
                        foodName = {"Chicken Wings"}
                        foodAmount = {cartData["chicken wings"].quantity}
                        foodCalorie={cartData["chicken wings"].calorie}
                        foodPrice = {cartData["chicken wings"].price}
                    />
                </div>
                <div className='total-calories'>
                    <div className='food-name'>Your Order Details</div>
                    <div>Total Calories: {totalCalories} cal</div>
                    <div>Total Price: $ {totalPrice} </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart; 