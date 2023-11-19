import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"


const Star = ({stars}) => {
    const ratingStars = Array.from({length: 5}, (_, index) => {
        let number = index + 0.5
        return <span key={index} style={{marginLeft: '3px'}}>
            {stars >= index + 1 ? 
            <FaStar className="star-icon" /> : stars >= number ? 
            <FaStarHalfAlt className="star-icon" /> : <FaRegStar className="star-icon" /> }
        </span>
    })

    return <div>{ratingStars}</div>
}

export default Star; 