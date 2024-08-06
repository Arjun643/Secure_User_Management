// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../redux/authSlice'; // Ensure this is correct

const defaultEmail = 'eve.holt@reqres.in'; // Default email for API call
const defaultPassword = 'pistol';
const defaultFirstName = 'John';
const defaultLastName = 'Doe';
const defaultAvatar = 'https://reqres.in/img/faces/1-image.jpg'; // Example avatar

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); // User's provided email
  const [password, setPassword] = useState(defaultPassword);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUserThunk({
        email: defaultEmail, // Use default email for registration
        password,
        firstName,
        lastName,
        avatar
      }) as any);
      // Save the user's email to Redux or local storage
      dispatch({ type: 'auth/setUserEmail', payload: email }); // Example: Dispatch an action to save email
      navigate('/dashboard'); // Navigate to Dashboard upon successful registration
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
          >
            Register
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="mt-4 text-center">
            <p className="text-gray-600">Already have an account?</p>
            <button
              onClick={() => navigate('/signin')}
              className="mt-2 text-blue-500 hover:underline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
