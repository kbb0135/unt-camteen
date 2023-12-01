import { useEffect, useState } from 'react'
import NavBar from "./NavBar.jsx";
import Footer from '../Components/Footer';
import {
    fetchNotifications,
    deleteNotification,
    uploadImage,
    postNotification,
    updateNotification
} from '../services/admin'
import NotificationForm from './NotificationForm'
import DeleteForm from './DeleteForm'
import toast from 'react-hot-toast'

export const Notifcation = () => {
    const [notifications, setNotifications] = useState([])
    const [addIsClicked, setAddIsClicked] = useState(false)
    const [notification2beUpdate, setNotification2beUpdate] = useState({})
    const [notification2beDelete, setNotification2beDelete] = useState({})

    //////////////////////////////////
    /* Helper */
    const updateStateAfterUpdation = (updatedNotification) => {
        console.log('updated', updatedNotification)
        const updatedList = notifications.map((notifiation) =>
            notifiation.title === updatedNotification.title
                ? updatedNotification
                : notifiation
        )
        setNotifications(updatedList)
    }

    //////////////////////////////////
    /* Fetch notifications */
    const doFetchNotifications = async () => {
        const response = await fetchNotifications()
        setNotifications(response)
    }
    useEffect(() => {
        doFetchNotifications()
    }, [])

    //////////////////////////////////
    /* Button handler */
    const handleAdd = () => {
        setNotification2beUpdate({})
        setAddIsClicked(true)
        openForm()
    }

    const handleEdit = (notification) => {
        setNotification2beUpdate(notification)
        setAddIsClicked(false)
        openForm()
    }

    const handleDelete = (notification) => {
        const deleteModal = document.querySelector('#dialog-delete')
        deleteModal.showModal()
        setNotification2beDelete(notification)
    }

    //////////////////////////////////
    /* Submit handler */
    const handleDeleteConfirmation = async () => {
        try {
            await deleteNotification(notification2beDelete)

            /* remove delete noti from list */
            const updatedNotificationList = notifications.filter(
                (notification) =>
                    notification.title !== notification2beDelete.title
            )
            setNotifications(updatedNotificationList)
            toast.success('Notfication deleted!')
            closeDeleteForm()
        } catch (error) {
            toast.error('Something went wrong. Please try again later')
            console.error(error)
        } finally {
            closeForm()
        }
    }

    const doAddNotification = (notification) => {
        const fn = uploadImage(notification.file)
            .then(async (downloadUrl) => {
                const postData = {
                    title: notification.title,
                    message: notification.message,
                    imageURL: downloadUrl
                }
                postNotification(postData)
                    .then(async () => {
                        setNotifications((prev) => [postData, ...prev])
                        closeForm()

                        /* disabled for now, once backend team fixes we are good to enable */
                        // await add2mailBox(notification)
                    })
                    .catch((error) => {
                        console.log(error)
                        toast.error('Notification post failed')
                    })
            })
            .catch(() => {
                toast.error('File upload failed. Try again later')
            })

        toast.promise(
            fn,
            {
                loading: 'Loading...',
                success: 'Everything went smoothly.',
                error: 'Uh oh, there was an error!'
            },
            {
                style: {
                    minWidth: '150px',
                    padding: '1em 2em',
                    fontSize: '1rem'
                }
            }
        )
    }

    const doUpdateNotification = async (updatedNotification) => {
        console.log(
            'updated daa',
            updatedNotification,
            !!updatedNotification.file
        )
        // ** When Image is not selected
        const updateWithoutImage = () =>
            updateNotification(
                { message: updatedNotification.message },
                updatedNotification.title
            )
                .then(() => {
                    updateStateAfterUpdation(updatedNotification)
                })
                .catch(() => {})
                .finally(() => {
                    closeForm()
                })

        // ** with image
        const updateWithImage = () =>
            uploadImage(updatedNotification.file)
                .then(async (downloadUrl) => {
                    console.log('I am called image')
                    await updateNotification(
                        {
                            message: updatedNotification.message,
                            imageURL: downloadUrl
                        },
                        updatedNotification.title
                    )
                    console.log('download url', downloadUrl)
                    updateStateAfterUpdation({
                        ...updatedNotification,
                        imageURL: downloadUrl
                    })
                    /* disabled for now, once backend team fixes we are good to enable */
                    // await add2mailBox(notification)
                    closeForm()
                })
                .catch(() => {
                    toast.error('File upload failed. Try again later ****')
                })

        // ** calling func
        toast.promise(
            updatedNotification.file ? updateWithImage() : updateWithoutImage(),
            {
                loading: 'Loading...',
                success: 'Everything went smoothly.',
                error: 'Uh oh, there was an error!'
            },
            {
                style: {
                    minWidth: '150px',
                    padding: '1em 2em',
                    fontSize: '1rem'
                }
            }
        )
    }

    const handleSubmit = async (notification) => {
        addIsClicked
            ? doAddNotification(notification)
            : doUpdateNotification(notification)
    }

    return (
        <>
        <NavBar/>
        <section className="section-notification-page">
            <div className="notification-page__header d-flex">
                <h2>All Notifications</h2>
                <button className="btn-noti btn-add" onClick={handleAdd}>
                    Add New
                </button>
            </div>
            <table className="table">
                <thead className="table-head">
                    <tr className="d-flex">
                        <th className="noti-title">Title</th>
                        <th className="noti-desc">Description</th>
                        <th className="noti-action">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.length ? (
                        notifications.map((notification) => (
                            <tr className="d-flex" r>
                                <td className="noti-title">
                                    <div className="title-container">
                                        <img
                                            className="noti-img"
                                            src={notification.imageURL}
                                            alt="uploaded item visual look"
                                        />
                                        <h4 className="noti-title_text">
                                            {notification.title}
                                        </h4>
                                    </div>
                                </td>
                                <td className="noti-desc">
                                    <p>{notification.message}</p>
                                </td>
                                <td className=" noti-action">
                                    <div className="d-flex">
                                        <button
                                            className=" btn-act btn-noti btn--outline"
                                            onClick={() =>
                                                handleEdit(notification)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className=" btn-act btn-noti btn--full"
                                            onClick={() =>
                                                handleDelete(notification)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                paddingBlock: '1em',
                                fontWeight: 600,
                                color: '#707070'
                            }}
                        >
                            No records found
                        </div>
                    )}
                </tbody>
            </table>
            <NotificationForm
                handleSubmit={handleSubmit}
                data={notification2beUpdate}
                addIsClicked={addIsClicked}
                setAddIsClicked={setAddIsClicked}
                handleCancel={closeForm}
            />
            <DeleteForm
                handleCancel={closeDeleteForm}
                handleConfirmation={handleDeleteConfirmation}
            />
            </section>
            <Footer/>
            </>
    )
}

//////////////////////////////////
/* Additional Helpers */
const openForm = () => {
    const modal = document.querySelector('#notification-form')
    modal.showModal()
}

const closeForm = () => {
    const modal = document.querySelector('#notification-form')
    modal.close()
}

const closeDeleteForm = () => {
    const modal = document.querySelector('#dialog-delete')
    modal.close()
}

export default Notifcation;