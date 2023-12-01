import React from 'react'
import '../style/style.css'
import '../style/Menu.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Rating from './Rating';

const FoodContainer = ({ item }) => {

    // ** State
    const navigate = useNavigate()
    const location = useLocation()
 
        return (
                <div className='menu-card'>
                    <div >
                    <img src={item.url} alt={item.name} />
                    </div>
                    <div className='menu-card-content'>
                        <span>{item.name}</span>
                        <Rating reviews={item.reviews}/>
                        <div><span>&#x24;{item.price}</span></div>
                        <button className='primary-button' onClick={() => navigate(`${location.pathname}/${item.category}/${item.id}`)}>Leave Review</button>
                        
                    </div>
                </div>
        ); 
    }; 

export default FoodContainer; 
