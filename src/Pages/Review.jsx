import React, { useEffect, useState } from 'react'

// ** Component
import Comment from '../Components/Comments'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { fetchById } from '../services/foods'
import Rating from '../Components/Rating'
import { fetchNutrition } from '../services/thirdParty'

// ** Avatar
import man from '../Assets/users-icon/man.png'
import girl from '../Assets/users-icon/girl.png'
import hacker from '../Assets/users-icon/hacker.png'
import cat from '../Assets/users-icon/cat.png'
import ReviewForm from '../Components/ReviewForm'
import { get2digitDeci } from '../utils'

// ** utils
const avatars = [man, girl, hacker, cat]

// ** Calorie table
const Nutrient = ({ nutrients}) => {
    return (
        <table className="cal-table">
            <thead className="cal-table-head">
                <tr>
                    <th className="cal-cell">Fat</th>
                    <th className="cal-cell">Protein</th>
                    <th className="cal-cell">CarboHydrate</th>
                    <th className="cal-cell">Fibre</th>
                    <th className="cal-cell">Calories</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="cal-cell">
                        {get2digitDeci(nutrients?.FAT || 0)} g
                    </td>
                    <td className="cal-cell">
                        {get2digitDeci(nutrients?.PROCNT || 0)} g
                    </td>
                    <td className="cal-cell">
                        {get2digitDeci(nutrients?.CHOCDF || 0)} g
                    </td>
                    <td className="cal-cell">
                        {get2digitDeci(nutrients?.FIBTG || 0)} g
                    </td>
                    <td className="cal-cell">
                        {get2digitDeci(nutrients?.ENERC_KCAL || 0)} kcal
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

// ** Main component
const Review = () => {
    // ** Review state
    const { id, category } = useParams()
    const [item, setItem] = useState({})
    const [nutrients, setNutrients] = useState({})
    const [showAll, setShowAll] = useState(false)

    // ** Fetch Details
    const fetchFoodDetails = async () => {
        const data = await fetchById({ collectionName: category, id })
        setItem(data)
    }

    // ** Fetch Calorie Info
    const feetchCaloriInfo = async () => {
        try{ 
        const nutrients = await fetchNutrition(id)
        setNutrients(nutrients)
        } catch(error) {
            console.error(error); 
        }
    }

    useEffect(() => {
        fetchFoodDetails()
        feetchCaloriInfo()
    }, [])

    let renderableReviews = []
    if (item.reviews) renderableReviews = showAll ? item.reviews : item.reviews.slice(0, 2)

    console.log(renderableReviews)
    return (
        <>
            <Header />
            {Object.values(item).length ? (
                <>
                    <main className="container">
                        <div className="rev">
                            <div className="rev-img-box">
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="rev-img"
                                />
                            </div>
                            <div>
                                <div className="rev-content">
                                    <p className="rev-name">{item.name}</p>
                                    <p className="rev-category">
                                        {item.category}
                                    </p>
                                    <p className="rev-desc">
                                        {item.description}
                                    </p>
                                    <Rating reviews={item.reviews} />
                                    <p className="rev-price">${item.price}</p>
                                </div>
                                <div>
                                    <Nutrient nutrients={nutrients} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <ReviewForm fetchReviews={fetchFoodDetails}/>
                        </div>
                    </main>

                    <div className="comments-section">
                        <hr></hr>
                        <h2>User Comments</h2>
                        {renderableReviews.map((review, index) => (
                            <Comment
                                id={index}
                                username={review.createdBy}
                                rating={review.rating}
                                comment={review.message}
                                imageSrc={avatars.at(index % 4)}
                                date={review.createdAt}
                            />
                        ))}
                        <div className='comment-show-more-btn'>
                        <button className='show-more-btn' onClick={() => setShowAll(prev => !prev)}>
                            {showAll ? 'Show less' : 'Show all reviews'}
                            </button>
                        </div>
                    </div>

                </>
            ) : (
                <div className="loading">Loading...</div>
            )}
        </>
    )
}
export default Review; 