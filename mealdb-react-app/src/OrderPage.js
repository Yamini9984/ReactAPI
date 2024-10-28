import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const params = new URLSearchParams(location.search);
  
  // Get the meal time and meals string from the URL
  const mealTime = params.get('time');
  const mealsString = params.get('meals');
  
  // Parse the meals string into an object
  const meals = mealsString ? JSON.parse(decodeURIComponent(mealsString)) : [];

  // Calculate the total amount for the order
  const totalAmount = meals.reduce((total, meal) => total + meal.price * meal.quantity, 0);

  // Handle the checkout action
  const handleCheckout = (e) => {
    e.preventDefault(); // Prevent the default button action
    console.log(`Proceeding to checkout for ${meals.length} items`);
    navigate('/checkout'); // Use navigate to redirect to the checkout page
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Meal Time: {mealTime}</h2>
      {meals.length > 0 ? (
        <div>
          {meals.map(meal => (
            <div key={meal.id}>
              <p>{meal.name}: {meal.quantity} x ${meal.price.toFixed(2)}</p>
            </div>
          ))}
          <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      ) : (
        <p>No meals selected.</p>
      )}
    </div>
  );
};

export default OrderPage;
