export const ReviewRating = ({rating, totalReviews}) => {
    const decimalPointInRating = rating - parseInt(rating); 
    return (
        <div className= "star-container">
            <div className= "star-rating">
                {[...Array(parseInt(rating))].map((star)=> {
                    return <span className="star">&#9733;</span>
                })}
                {decimalPointInRating ? (
                    <span style={{ width: `${decimalPointInRating}em`}}
                    class= "half-star">
                        &#9733; 
                    </span>)   :   (
                    "" )
                }
            </div>
            <div className="total-reviews">
                <span className="rating-value">{rating}</span>
                {`(${totalReviews} Reviews)`}
            </div>
        </div>
    ); 
};