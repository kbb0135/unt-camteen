import React from 'react'; 
import Star from './Star';

const Comment = ({id, username, comment, date, imageSrc, rating}) => {
    return (
        <div className="comments-container" key={id}>
            <div className="user-comment">
                <div className="username-and-image">
                    <img className="userImage card__image" src={imageSrc} alt="user profile" />
                    <p className="usename">{username}</p>
                </div>
                <div className="rating-and-comment">
                    <Star stars={rating} />
                    <p>{comment}</p>
                </div>
            </div>
            <p className="date"> {date} </p>
        </div>

    ); 
}; 

export default Comment; 