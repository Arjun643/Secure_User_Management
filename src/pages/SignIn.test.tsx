// src/pages/SignIn.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import SignIn from '../pages/SignIn';
import store from '../redux/store'; // Import the configured store

test('renders SignIn page and handles login', async () => {
  render(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const signInButton = screen.getByRole('button', { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(signInButton);

  // Here you would check if the login action has been dispatched and if the navigation occurred
});
