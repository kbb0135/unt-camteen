export const config = {
    baseURL: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
    }
}