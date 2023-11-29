const DeleteForm = ({handleConfirmation, handleCancel}) => {
    return <dialog id="dialog-delete" className="notification-form dialog-delete">
        <h4 className="header-delete">Delete Notification</h4>
        <p>Are you sure that you want to delete this notification permanently? This action cannot be undone.</p>
        <div className="btn-container margin-top--md">
            <button className="btn-noti btn--outline btn--cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn-noti btn--delete" onClick={handleConfirmation}>Delete</button>
        </div>
    </dialog>
}

export default DeleteForm;