import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // To enable routing in tests
import App from './App';

test('renders navigation links', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check for Home link
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();

  // Check for All Meals link
  const allMealsLink = screen.getByText(/All Meals/i);
  expect(allMealsLink).toBeInTheDocument();

  // Check for Chicken Meals link
  const chickenMealsLink = screen.getByText(/Chicken Meals/i);
  expect(chickenMealsLink).toBeInTheDocument();
});
