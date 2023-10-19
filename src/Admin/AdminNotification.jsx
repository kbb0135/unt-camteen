import React, { useState, useEffect } from 'react';
import '../style/AdminNotification.css'
import Header from '../Components/Header';
import { db, storage } from '../firebase.js';
import { getDocs, collection, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const AdminNotification = (e) => {
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [image, setImage] = useState('');


    useEffect(() => {
        const getNotification = async () => {
            try {
                const snapshot = await getDocs(collection(db, "Notification"));
                const messages = snapshot.docs.map(doc => ({
                    title: doc.data().title,
                    text: doc.data().message,
                    imgURL: doc.data().imageURL
                }));
                setNotifications(messages);
                console.log(messages)
            } catch (error) {
                console.error("Error retrieving notifications:", error);
            }
        }

        getNotification();
    }, []);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const addNotification = async () => {

        if (newTitle.trim() !== '' && newNotification.trim() !== '') {
            try {
                const storageRef = ref(storage, newTitle);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on('state_changed',
                    (snapshot) => {

                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default:
                                alert("Something went wrong")
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        alert(error.message)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            console.log('File available at', downloadURL);
                            await setDoc(doc(db, "Notification", newTitle), {
                                title: newTitle,
                                message: newNotification,
                                imageURL: downloadURL
                            });
                        });

                    }
                )
                const userCollection = collection(db, "Users")
                const querySnapShot = await getDocs(userCollection);
                const userEmails = querySnapShot.docs.map((doc) => doc.data().email);
                

                for (const email of userEmails) {
                    await setDoc(doc(db, "mail", "mails"), {
                        to: email,
                        message: {
                            subject: newTitle,
                            html: newNotification,
                        }
                    })
                    await sleep(5000)
                    console.log("success")


                }
            }
            catch { }

            // State will be updated everytime with the notification
            setNotifications([...notifications, { title: newTitle, text: newNotification, imageURL: image }]);
            setNewTitle('');
            setNewNotification('');
            console.log(image)
        }
    };
    var temp = " "
    const editNotification = (index) => {


        setEditIndex(index);
        setNewTitle(notifications[index].title);
        setNewNotification(notifications[index].text);
        temp = notifications[index].title;
        setImage(notifications[index].imageUrl)
    };
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

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

                const userCollection = collection(db, "Users")
                const querySnapShot = await getDocs(userCollection);
                const userEmails = querySnapShot.docs.map((doc) => doc.data().email);
                

                for (const email of userEmails) {
                    await setDoc(doc(db, "mail", "mails"), {
                        to: email,
                        message: {
                            subject: newTitle,
                            html: newNotification,
                        }
                    })
                    await sleep(5000)
                    console.log("success")


                }


            }
            catch (error) {
                console.log(error)
            }
            await setNotifications(updatedNotifications);
            setEditIndex(null);
            setNewTitle('');
            setNewNotification('');
            setImage(null)

        }
    };

    const deleteNotification = async (index) => {
        const updatedNotifications = [...notifications];
        await deleteDoc(doc(db, "Notification", updatedNotifications[index].title));
        updatedNotifications.splice(index, 1);
        console.log(updatedNotifications.splice(index, 1));
        setNotifications(updatedNotifications);
    };

    return (
        <div>
            <Header />
            <h1>Admin Notifications</h1>
            <div>
                <h3>Enter Title</h3>
                <input
                    type="text"
                    placeholder="Enter notification title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <div>
                    <label>Image:</label>
                    <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageChange} />
                </div>
                {image && <img src={image} alt="Notification" className="notification-image" />}
                <h3>Enter Notification Text</h3>
                <textarea
                    placeholder="Enter notification"
                    value={newNotification}
                    onChange={(e) => setNewNotification(e.target.value)}
                    rows="4"
                />
                {editIndex !== null ? (
                    <>
                        <button onClick={updateNotification}>Update</button>
                        <button onClick={() => setEditIndex(null)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={addNotification}>Add</button>
                )}
            </div>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index} className="notification-item">
                        {notification.imgURL && (
                            <img src={notification.imgURL} alt="Notification" className="notification-image" />
                        )}
                        <div>
                            <h3 className="notification-title">{notification.title}</h3>
                            <p className="notification-text">{notification.text}</p>
                        </div>
                        <div className="comment-separator"></div>
                        <div className="notification-buttons">
                            <button className="edit-button" onClick={() => editNotification(index)}>
                                Edit
                            </button>
                            <button onClick={() => deleteNotification(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminNotification;
