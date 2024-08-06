// src/pages/Dashboard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store'; // Import AppDispatch
import { fetchUserListThunk } from '../redux/userSlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { list: users, status, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
      dispatch(fetchUserListThunk(2)); // Fetch users for page 2
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          {user ? (
            <>
              <p className="text-xl font-semibold text-gray-700">Welcome, {user.firstName} {user.lastName}!</p>
              <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto mt-4 shadow-lg" />
              <p className="text-lg text-gray-600 mt-4">Email: {user.email}</p>
            </>
          ) : (
            <p className="text-lg text-gray-600">No user data available</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-3 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">User List:</h2>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {status === 'succeeded' && (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">First Name</th>
                  <th className="border border-gray-300 p-2">Last Name</th>
                  <th className="border border-gray-300 p-2">Avatar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{user.id}</td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">{user.first_name}</td>
                    <td className="border border-gray-300 p-2">{user.last_name}</td>
                    <td className="border border-gray-300 p-2">
                      <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default Dashboard;
