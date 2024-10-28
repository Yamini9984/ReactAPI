import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the MealDB  App</h1>
      
      <img 
        src="https://plus.unsplash.com/premium_photo-1661777702966-aed29ab4106b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhbHxlbnwwfHwwfHx8MA%3D%3D" 
        alt="Full Screen Meal Image"
        className="fullscreen-image"
      />
    </div>
  );
};

export default Home;
