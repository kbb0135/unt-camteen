import React from 'react'; 
import "../style.css"; 
import {ReviewRating} from "./ReviewRating"; 

function FoodContainer({foodImage, foodName, rating, totalReviews}) 
{
    return (
        <div className='food-container'>
            <div className="food-image-container">
                <img className='food-image' src={foodImage} alt="" />
            </div>
            <div className='food-info'>
                <div className='food-name'>{foodName}</div>
                <ReviewRating rating={rating} totalReviews={totalReviews} />
                <div className='leave-review'>Leave a review.</div>
            </div>

        </div>
    ); 
}


export default FoodContainer; 