import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

const ItemEditor = ({ itemId, onClose }) => {
  const [item, setItem] = useState({});
  const [nutritionalValues, setNutritionalValues] = useState({
    fat: '',
    protein: '',
    carbohydrate: '',
    sugar: '',
    vitamins: '',
    // Add more fields as needed
  });

  useEffect(() => {
    const getItemData = async () => {
      // Fetch the item details based on the itemId from Firestore
      try {
        const itemDoc = await doc(db, 'YourCollectionName', itemId); // Replace 'YourCollectionName' with the actual collection name
        const itemData = (await itemDoc.get()).data();
        setItem(itemData);
        // You can also fetch nutritional values if they are stored in the item's data
        if (itemData.nutritionalValues) {
          setNutritionalValues(itemData.nutritionalValues);
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    getItemData();
  }, [itemId]);

  const handleSave = async () => {
    // Update the nutritional values in the Firestore document
    try {
      const itemDoc = doc(db, 'YourCollectionName', itemId); // Replace 'YourCollectionName' with the actual collection name
      await updateDoc(itemDoc, { nutritionalValues });
      console.log('Nutritional values saved to Firestore');
    } catch (error) {
      console.error('Error updating nutritional values:', error);
    }
  };

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <div>
        <h3>Nutritional Values:</h3>
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
        <button onClick={handleSave}>Save Nutritional Values</button>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ItemEditor;
