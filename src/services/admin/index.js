import toast from 'react-hot-toast'
import {
    getDocs,
    collection,
    doc,
    deleteDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../../firebase'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const fetchNotifications = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'Notification'))
        const messages = snapshot.docs.map((doc) => ({
            ...doc.data()
        }))
        return messages
    } catch (error) {
        toast.error('Could not fetch notifications. Please try again later')
        console.error('Error retrieving notifications:', error)
    }
}

export const postNotification = async (newNotification) => {
    console.log(newNotification, 'postD')
    try {
        const ref = doc(db, 'Notification', newNotification.title)
        await setDoc(ref, newNotification)
    } catch (error) {
        console.error(error)
        throw new Error('Post Notfication Failed')
    }
}

export const updateNotification = async (updateData, id) => {
    try {
        console.log(id)
        const editDoc = doc(db, 'Notification', id)
        await updateDoc(editDoc, updateData)
    } catch (error) {
        console.error(error)
        throw new Error('Notificatin update failed')
    }
}

export const deleteNotification = async (notification) => {
    try {
        await deleteDoc(doc(db, 'Notification', notification.title))
    } catch (error) {
        throw new Error('Something went wrong.')
    }
}

export const uploadImage = async (file) => {
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    try {
        await uploadTask
        return await getDownloadURL(uploadTask.snapshot.ref)
    } catch (error) {
        return error
    }
}

export const add2mailBox = async (notification) => {
    const userSnapshot = await getDocs(collection(db, 'Users'))
    const userEmails = userSnapshot.docs.map((doc) => doc.data().email)

    // ** Just extracted code to services, not fixed
    userEmails.map(async (email) => {
        return await setDoc(doc(db, 'mail', 'mails'), {
            to: email,
            message: {
                subject: notification.title,
                html: notification
            }
        })
    })
}