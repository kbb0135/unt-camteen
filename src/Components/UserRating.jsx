import React, { useState } from "react";
export const UserRating = ({ rating }) => {
 
  return (
    <div>
      {[...Array(rating)].map((star) => (
        <span
          key={star}
          style={{
            color:"gold" 
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};