import React from "react"
import Star from "./Star"

const Rating = ({reviews}) => {
    const reviewerCount = reviews.length
    const totalRatings= reviews.reduce((acc, review) => acc + Number(review.rating), 0)
    let avgStars = 0
    if (reviewerCount) {
        avgStars = (totalRatings/reviewerCount).toFixed(1)
    }
    
    return <div className="star-content">
        <p className="star-count">{avgStars}</p>
        <Star stars={avgStars} />
        <p className="rev-count">({reviewerCount} reviews)</p>
    </div>
}

export default Rating; 