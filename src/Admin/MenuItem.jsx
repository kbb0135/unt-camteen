import React, { useState } from "react";
import "../style/Menu.css";

const MenuItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedItem(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  return (
    <div>
      {isEditing ? (
        <div className="edit-menu">
          <div>
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={editedItem.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={editedItem.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => {
                const selectedImage = e.target.files[0];
                setEditedItem({
                  ...editedItem,
                  image: URL.createObjectURL(selectedImage),
                });
              }}
            />
          </div>
          <div>
            <button className="ghost-button red-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="primary-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="menu-card">
          <img src={item.image} alt={item.name} className="food-img" />
          <div className="menu-card-content">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <span>
              <button
                className="primary-button red-button"
                onClick={() => onDelete(editedItem.id)}
              >
                Delete
              </button>
              <button className="primary-button" onClick={handleEdit}>
                Edit
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
