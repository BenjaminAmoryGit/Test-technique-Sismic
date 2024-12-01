import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import { GlobalProvider } from './GlobalContext';

test('renders Users list heading', () => {
  render(
      <GlobalProvider>
          <App />
      </GlobalProvider>
  );

  const headingElement = screen.getByText(/Users list/i);
  expect(headingElement).toBeInTheDocument();
});
