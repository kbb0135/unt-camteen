import React, { useState } from 'react';

const ItemForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCategoryChange = (event) => {
      setCategory(event.target.value); // Update selected category
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || isNaN(price) || parseFloat(price) <= 0) {
      alert('Please enter valid data.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: name,
      price: parseFloat(price),
      image: URL.createObjectURL(image), // Convert the uploaded image to a URL
    };
    onAdd(newItem);

    setName('');
    setPrice('');
    setImage(null);
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
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
        <div>
          <label>Image:</label>
          <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ItemForm;
