import React, { useState } from 'react';
import '../style/Menu.css';

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
    <div className="food">
      {isEditing ? (
        <div>
          <div>
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={editedItem.name}
              onChange={handleInputChange}
            />
          </div>
          <div >
            <label >Price</label>
            <input
              type="text"
              name="price"
              value={editedItem.price}
              onChange={handleInputChange}
            />
          </div>
          <div >
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
        </div>
      ) : (
        <div>
          <div className='img-container'>
            <img src={item.image} alt={item.name} className='food-img'/>
          </div>
          <div className='food-content'>
            <span className='food-header'>{item.name}</span>
            <span className='food-price'>${item.price}</span>
          </div>
        </div>
      )}
      <div className='food-btns'>
      {isEditing ? (
        <div>
          <button className='food-btn' onClick={handleSave}>Save</button>
          <button className='food-btn' onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button className='food-btn' onClick={handleEdit}>Edit</button>
      )}
       
      <button className='food-btn' onClick={() => onDelete(editedItem.id)}>Delete</button>
      </div>
    </div>
  );
};

export default MenuItem;
