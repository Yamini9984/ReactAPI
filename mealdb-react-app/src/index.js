import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ChickenMeals from './ChickenMeals';
import OrderPage from './OrderPage';
import Checkout from './Checkout';
import Home from './Home';
import AllMeals from './AllMeals';

// Main App component
const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-meals">All Meals</Link></li>
          <li><Link to="/chicken-meals">Chicken Meals</Link></li>
          <li><Link to="/order">Order</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-meals" element={<AllMeals />} />
        <Route path="/chicken-meals" element={<ChickenMeals />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

// Rendering the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Render the App component instead of individual components */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
