import React,{useState} from 'react';
export const ReviewRating = () => {
    const [rating, setRating] = useState(0);
    const handle=(newRating) => {
      setRating(newRating)}
      console.log("set rating"+rating)
  return (
    <div>
      <p>Your Rating: {rating} stars</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handle(star)}
          style={{
            cursor: 'pointer',
            color: star <= rating ? 'gold' : 'gray',
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
};