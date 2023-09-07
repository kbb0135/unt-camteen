import React from 'react'; 
import "../calorie-viewer.css"; 
import "../review.css"; 

function CartContainer ({
    foodImage, foodName, foodAmount, foodCalorie, foodPrice
}) {
    return (
        <div className='food-container'>
            <div className='food-image-container'>
                <img className='food-image' src={foodImage} alt="" />
            </div> 
            <div className='food-info'>
                <div className='food-name'>{foodName}</div>
                    <div className='food-amount'>Quantity ordered: {foodAmount}</div>
                    <div className='food-calorie'>Calorie per unit: {foodCalorie} cal</div>
                    <div className='food-price'>Total Price: ${foodPrice}</div>
            </div>
        </div>
    ); 
}
export default CartContainer; 