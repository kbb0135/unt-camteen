import React, { useState } from "react";
import { db, storage } from "../firebase.js";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../style/Menu.css";

const ItemForm = ({ onAdd, setIsFormOpen }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [addValue, setAddValue] = useState();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update selected category
  };

  const handleAddEvent = (e) => {
    const addValue = e.target.value;
    if (!isNaN && parseInt(addValue) > 0) {
      setAddValue(addValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || isNaN(price) || parseFloat(price) <= 0) {
      alert("Please enter valid data.");
      return;
    }

    const newItem = {
      id: name,
      name: name,
      category: e.target[2].value,
      price: parseFloat(price),
      image: URL.createObjectURL(image), // Convert the uploaded image to a URL
      img: e.target[3].files[0],
      quantity: e.target[4].value,
    };
    onAdd(newItem);
    const addData = async () => {
      console.log(newItem.category);
      try {
        const storageRef = ref(storage, newItem.name);
        const uploadTask = uploadBytesResumable(storageRef, newItem.img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                alert("Something went wrong");
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            alert(error.message);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                newItem.image = downloadURL;

                await setDoc(doc(db, newItem.category, newItem.name), {
                  Name: newItem.name,
                  Price: price,
                  ImageURL: downloadURL,
                  date: Timestamp.now(),
                  category: category,
                  quantity: e.target[4].value,
                });

                alert("Database created");
                newItem.category = category;
              }
            );
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    addData();
    setName("");
    setPrice("");
    setImage(null);
  };

  return (
    <div className="edit-menu">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              placeholder="Enter Item Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              value={price}
              placeholder="Enter Item Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Category:</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="select"
              required
            >
              <option value="" className="categoryVal">
                Select a category
              </option>
              <option value="Entrees" className="option">
                Entrees
              </option>
              <option value="Side" className="option">
                Side
              </option>
              <option value="Drink" className="option">
                Drink
              </option>
              <option value="Chips" className="option">
                Chips
              </option>
              <option value="Desert" className="option">
                Desert
              </option>
            </select>
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Item Quantity:</label>
            <input
              type="text"
              value={addValue}
              onChange={handleAddEvent}
              placeholder="Enter item quantity"
            />
          </div>
        </div>
        <div>
          <button
            className="ghost-button red-button"
            type="button"
            onClick={() => {
              setIsFormOpen(false);
            }}
          >
            Cancel
          </button>
          <button className="primary-button" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
