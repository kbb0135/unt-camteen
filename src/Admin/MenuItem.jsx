import React, { useState } from 'react';

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
    <div className="menu-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            value={editedItem.price}
            onChange={handleInputChange}
          />
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
      ) : (
        <div>
          <img src={item.image} alt={item.name} />
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
      )}
      {isEditing ? (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
      <button onClick={() => onDelete(editedItem.id)}>Delete</button>
    </div>
  );
};

export default MenuItem;
