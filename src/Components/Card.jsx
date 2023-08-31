import React from 'react';
import Star from '../Assets/Star.png';
import '../style.css';

const Card = ({ title, price, location, imageSrc, rating }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card__image" />
      <div className='card_NameAndPrice'>
        <h3 className="card__title">{title}</h3>
      <h3 className="card_price">{price}</h3>
      </div>
      <h5 className='card_rating'>{rating} <img src={Star} alt=""></img></h5>
      <p className="card__location">{location}</p>
    </div>
  );
};

export default Card;
