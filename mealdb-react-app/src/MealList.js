import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealList = ({ url }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(url);
        setMeals(response.data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [url]);

  return (
    <div>
      {meals ? (
        meals.map((meal) => (
          <div key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
            <h2>{meal.strMeal}</h2>
            <p>Area: {meal.strArea}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MealList;
