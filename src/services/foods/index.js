import toast from 'react-hot-toast';
import { collection, getDoc, getDocs, doc, addDoc } from 'firebase/firestore'
import { auth, db} from '../../firebase.js'

// ** Utils
import { formatFoodObj, getCurrentFormattedDate } from '../../utils/index.js';


// ** Service to fetch review
const fetchReviews = async (id) => {
  const revRef = collection(db, `Reviews/${id}/comments`)
  const reviewDocs =  await getDocs(revRef)
  return reviewDocs.docs.map(doc => doc.data())
}

// ** Service to fetch foods detail
export const fetchData = async ({collectionName}) => {  
    try {
      const foodDocs = await getDocs((collection(db, collectionName)));
      const items = []

      // ** Fetch Reviews 
      for (let doc of foodDocs.docs) {
        const reviews = await fetchReviews(doc.id)
        const item =  formatFoodObj(doc)
        items.push({...item, reviews})
      }
      return   items
    } catch (error) {
      console.error(error)
      toast.error('No response from server')
      return [];
    }
  };

  // ** Fetch of give id from collection
  export const fetchById = async ({collectionName, id}) => {
    try {

    // ** Fetch
    const reviews = await fetchReviews(id)
    console.log("test", reviews)
    const ref = doc(db, collectionName, id)
    const foodInfo = await getDoc(ref)
    
    // format and send
    const item = formatFoodObj(foodInfo)
    return {...item, reviews}

    } catch (error) {
      console.error(error)
      toast.error('No response from server')
      return {}
    }
  }

  // ** Post Review
  export const postReview = async ({data, id}) => {

    try {
    // ** Set additional data
    const createdAt = getCurrentFormattedDate()
    const createdBy = auth.currentUser.displayName || 'Anonymous'

    // ** Post review
    const ref = collection(db, `Reviews/${id}/comments`)
    await addDoc(ref, {...data, createdAt, createdBy})
    toast.success('Successfully posted your feedback. Thank you!')

    } catch(error) {
      console.error(error)
      toast.error('Couldn\'t connect to firebase')
    }

  }