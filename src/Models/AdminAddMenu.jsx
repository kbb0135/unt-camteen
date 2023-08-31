import React, { useState } from 'react'
import { db, storage } from '../firebase.js'
import { Timestamp, doc, setDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



export default function AdminAddMenu() {
    const [category, setCategory] = useState('');
    const handleCategoryChange = (event) => {
        setCategory(event.target.value); // Update selected category
    }
    const Submit = async (event) => {
        event.preventDefault()
        const itemName = event.target[0].value;
        const categories = event.target[1].value;
        const price = event.target[2].value;
        const img = event.target[3].files[0];
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        console.log(event.target[2].value);

        // const menu = doc(db, categories , itemName)
        // setDoc(menu, 
        //     {Name: itemName}, 
        //     {Price: price},
        //     {merge: true})
        //setting up the database with downloadable URL
        
        
        console.log("Updated")
        
        try {
            const storageRef = ref(storage, itemName);
            const uploadTask = uploadBytesResumable(storageRef, img);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
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
                        await setDoc(doc(db, categories, itemName), {
                            Name: itemName,
                            Price: price,
                            ImageURL: downloadURL,
                            date: Timestamp.now()              
                        });            
                    });
                    
                    
                }
                
            );
            
        }
        catch {

        }
        

    }

    return (
        <div>
            <form onSubmit={Submit}>
                <label htmlFor="itemName">Item Name:</label>
                <input type="text" id="itemName" className="itemName" />

                <label htmlFor="itemName" className="name">Categories:</label>
                <div className="categories">
                    <select id="category" value={category} onChange={handleCategoryChange} className="select" required>
                        <option value="" className="categoryVal">Select a category</option>
                        <option value="Entrees" className="option">Entrees</option>
                        <option value="Side" className="option">Side</option>
                        <option value="Drink" className="option">Drink</option>
                        <option value="Chips" className="option">Chips</option>
                        <option value="Desert" className="option">Desert</option>
                    </select>
                </div>
                <label htmlFor="price">Price:</label>
                <input type="text" id="price" className="price" />
                <input type="file" id="myFile" className="fileName" />

                <input type="submit" value="Submit" alt=" " />
            </form>
        </div>
    )
}
