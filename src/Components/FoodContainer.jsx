import React from 'react'
import '../style/style.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Rating from './Rating';

const FoodContainer = ({ item }) => {

    // ** State
    const navigate = useNavigate()
    const location = useLocation()
 
        return (
                <div className='food'>
                    <div className='img-container'>
                    <img src={item.url} alt={item.name} className='food-img'/>
                    </div>
                    <div className='food-content'>
                        <p className='food-header'>{item.name}</p>
                        <p className='food-category'>{item.category}</p>
                        <Rating reviews={item.reviews}/>
                        <div><p className='food-price'>&#x24;{item.price}</p></div>
                        <button className='review-btn' onClick={() => navigate(`${location.pathname}/${item.category}/${item.id}`)}>Leave Review</button>
                        
                    </div>
                </div>
        ); 
    }; 

export default FoodContainer; 