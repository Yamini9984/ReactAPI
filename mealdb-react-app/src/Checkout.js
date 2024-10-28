import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);

  const handlePayment = () => {
    console.log('Payment successful!');
    // Redirect to home page after payment
    navigate('/');
  };

  const handleImageClick = () => {
    // Show thank you message when image is clicked
    setShowThankYou(true);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Your order has been confirmed!</p>

      {/* Conditionally render thank you message */}
      {showThankYou ? (
        <p>Thank you for your order!</p>
      ) : (
        <img 
          src="https://thumbs.dreamstime.com/b/eps-lady-smartphone-notification-order-has-been-confirmed-online-shopping-gift-box-credit-card-paper-bag-objects-250809168.jpg" 
          alt="Order confirmation" 
          style={{ cursor: 'pointer', marginTop: '10px' }}
          onClick={handleImageClick}
        />
      )}

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
