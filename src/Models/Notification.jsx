import React, { useState, useEffect } from 'react';
import '../style/AdminNotification.css'
import Header from '../Components/Header';
import { db } from '../firebase.js';
import { getDocs, collection, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [newTitle, setNewTitle] = useState(null);

    useEffect(() => {
        const getNotification = async () => {
            try {
                const snapshot = await getDocs(collection(db, "Notification"));
                const messages = snapshot.docs.map(doc => ({
                    title: doc.data().title,
                    text: doc.data().message
                }));
                setNotifications(messages);
            } catch (error) {
                console.error("Error retrieving notifications:", error);
            }
        }

        getNotification();
    }, []);

    const updateNotification = async () => {
        if (newTitle.trim() !== '' && newNotification.trim() !== '') {
            const updatedNotifications = [...notifications];
            updatedNotifications[editIndex] = { title: newTitle, text: newNotification };
            try {
                const editData = doc(db, "Notification", notifications[editIndex].title);
                await updateDoc(editData, {
                    title: newTitle,
                    message: newNotification
                })
                await setDoc(doc(db, "Notification", notifications[editIndex].title), {
                    title: newTitle,
                    message: newNotification
                });
                console.log("here")

            }
            catch(error) {
                console.log(error)
            }
            setNotifications(updatedNotifications);
            setEditIndex(null);
            setNewTitle('');
            setNewNotification('');
        }
    };



    return (
        <div className='notification-page'>
            <Header />
            <h1>UNT Canteen Notifications</h1>
            <div >
                {editIndex !== null ? (
                    <>
                        <button onClick={updateNotification}>Update</button>
                        <button onClick={() => setEditIndex(null)}>Cancel</button>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index} className="notification-item">
                        <h3 className="notification-title">{notification.title}</h3>
                        <p className="notification-text">{notification.text}</p>
                        <div className="comment-separator"></div>
                        <div className="primary-button">
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notification;
