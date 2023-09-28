import React from 'react'; 
import Star from '../Assets/Star.png'; 
import { UserRating} from './UserRating'; 

const Comment = ({ username, comment, date, imageSrc, rating}) => {
    return (
        <div className="comments-container">
            <div className="user-comment">
                <div className="username-and-image">
                    <img classname="userImage card__image" src={imageSrc} alt="user-image" />
                    <p className="usename">{username}</p>
                </div>
                <div className="rating-and-comment">
                    <UserRating rating= {rating}/>
                    <p>{comment}</p>
                </div>
            </div>
            <p className="date"> {date} </p>
        </div>

    ); 
}; 

export default Comment; 