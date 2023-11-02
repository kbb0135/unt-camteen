/* ------------ */
/* FORMAT DATE */
/* ------------ */
export const getCurrentFormattedDate = () => {
    const date  = new Date()
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
}

export const get2digitDeci = deci => {
    
    try {
    return deci ? deci.toFixed(2) : 0
    } catch (error) {
        console.error(error)
        return 0
    }
}


export const formatFoodObj = doc => {
    return {
        id: doc.id,
        name: doc.data().Name,
        url: doc.data().ImageURL,
        price: doc.data().Price,
        category: doc.data().category,
        description: 'A balanced and nutritious diet that provides essential nutrients to support overall well-being and maintain optimal health. It is characterized by the following key principles'
      
    }
}