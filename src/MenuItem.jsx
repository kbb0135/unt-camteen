import React, { useState } from 'react';

const MenuItem = ({ item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nutritionalValues, setNutritionalValues] = useState({
    fat: '',
    protein: '',
    carbohydrate: '',
    sugar: '',
    vitamins: '',
    // Add more fields as needed
  });

  const handleSave = () => {
    // Save the nutritional values to local storage
    localStorage.setItem(item.id, JSON.stringify(nutritionalValues));

    // Call the onEdit function to update the item with nutritional values
    onEdit({
      ...item,
      nutritionalValues,
    });

    setIsEditing(false);
  };

  return (
    <div className="menu-item">
      <h3>{item.name}</h3>
      <p>Price: {item.price}</p>

      {isEditing ? (
        <div>
          <h4>Nutritional Values:</h4>
          <div>
            <label>Fat:</label>
            <input
              type="text"
              value={nutritionalValues.fat}
              onChange={(e) =>
                setNutritionalValues({
                  ...nutritionalValues,
                  fat: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Protein:</label>
            <input
              type="text"
              value={nutritionalValues.protein}
              onChange={(e) =>
                setNutritionalValues({
                  ...nutritionalValues,
                  protein: e.target.value,
                })
              }
            />
          </div>
          {/* Add input fields for other nutritional values here */}

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          {/* Display nutritional values here */}
          {item.nutritionalValues && (
            <div>
              <h4>Nutritional Values:</h4>
              <p>Fat: {item.nutritionalValues.fat}</p>
              <p>Protein: {item.nutritionalValues.protein}</p>
              {/* Display other nutritional values here */}
            </div>
          )}

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
