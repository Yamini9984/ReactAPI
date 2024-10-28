import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './AllMeals.css'; // Importing the CSS file

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMealTime, setSelectedMealTime] = useState(''); // State for selected meal time
  const [quantities, setQuantities] = useState({}); // State to track quantities for each meal

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        // Assign a unique price to each meal (example prices)
        const mealsWithPrices = response.data.meals.map((meal, index) => ({
          ...meal,
          price: (10 + index) * 1.5, // Example pricing logic
        }));
        setMeals(mealsWithPrices);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  const handleMealTimeChange = (event) => {
    setSelectedMealTime(event.target.value); // Update selected meal time
  };

  const handleQuantityChange = (mealId, event) => {
    const value = parseInt(event.target.value, 10);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [mealId]: value > 0 ? value : 0, // Ensure quantity is not negative
    }));
  };

  const getTotalPrice = () => {
    return meals.reduce((total, meal) => {
      const quantity = quantities[meal.idMeal] || 0;
      return total + meal.price * quantity;
    }, 0);
  };

  const getSelectedMeals = () => {
    return meals
      .filter(meal => quantities[meal.idMeal] > 0)
      .map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        quantity: quantities[meal.idMeal],
        price: meal.price,
      }));
  };

  return (
    <div className="all-meals-container"> {/* Main container */}
      <h1>All Meals</h1>
      <div className="meal-time-selector">
        <label htmlFor="meal-time">Select Meal Time: </label>
        <select id="meal-time" value={selectedMealTime} onChange={handleMealTimeChange}>
          <option value="">Select...</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>
      <div className="meals-grid"> {/* Flex container for meal cards */}
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div className="meal-card" key={meal.idMeal}> {/* Meal card */}
              <div className="meal-image">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <button className="add-to-cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
              <h2>{meal.strMeal}</h2>
              <p>Area: {meal.strArea}</p>
              <p>Price: ${meal.price.toFixed(2)}</p>
              <label>
                Quantity:
                <input
                  type="number"
                  min="0"
                  value={quantities[meal.idMeal] || 0}
                  onChange={(e) => handleQuantityChange(meal.idMeal, e)}
                />
              </label>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {getSelectedMeals().length > 0 ? (
          <div>
            {getSelectedMeals().map(item => (
              <p key={item.id}>{item.name}: {item.quantity} x ${item.price.toFixed(2)}</p>
            ))}
            <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
            <Link
              to={{
                pathname: '/order',
                search: `?meals=${JSON.stringify(getSelectedMeals())}&time=${selectedMealTime}`,
              }}
              className="order-button"
            >
              Order Now
            </Link>
          </div>
        ) : (
          <p>No meals selected.</p>
        )}
      </div>
    </div>
  );
};

export default AllMeals;
