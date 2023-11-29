import React, { useState, useEffect } from 'react';
import '../style/Menu.css'
export const Notifier = ({ message, setMessage }) => {
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (message) {
            setNotification(true);
            const timer = setTimeout(() => {
                setNotification(false);
                setMessage('')
            }, 3000)
            return () => clearTimeout(timer)
        }

    }, [message, setMessage])

    return (
        <div className={`notification ${notification ? "enable": null}`}>
            {message}
        </div>
    )
}