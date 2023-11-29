import { useEffect, useState } from "react"

const NotificationForm = ({handleSubmit, data = {file: null}, handleCancel}) => {
    const [updateData, setUpdateData] = useState(data)

    useEffect(() => {
        setUpdateData(() => ({...data, file: null}))
    }, [data])

    const handleInputChange = event => {
        const {name, value} = event.target

        setUpdateData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = event => {
        const selectedImage = event.target.files[0];
        setUpdateData(prev => ({...prev, file : selectedImage}))
    }

    return (
        <dialog className="notification-form " id="notification-form">
            <form onSubmit={(event) => {
                 event.preventDefault()
                 handleSubmit(updateData)
            }}>
                <h4 className="notification-form-header">Notification</h4>
                <div className="notification-form__row">
                    <div>
                        <label className="input-label">Title</label>
                        <input name="title" onChange={handleInputChange} type="text" value={updateData.title} required disabled={!!Object.keys(data).length} />
                    </div>
                    <div>
                        <input name="file" onChange={handleImageChange} class="btn-upload" type="file" accept=".png,.jpg,.jpeg" />
                    </div>
                    <div>
                    <label className="input-label">Message</label>
                    <textarea name="message" onChange={handleInputChange} rows={5} cols={80} value={updateData.message || ''} required>
                    </textarea>
                    </div>
                    <div className="btn-container">
                    <button className="btn-noti btn--full" >Submit</button>
                    <button className="btn-noti btn--outline" type="reset" onClick={handleCancel}>Cancel</button>
                </div>
                </div>
                
            </form>
        </dialog>
    )
}

export default NotificationForm;