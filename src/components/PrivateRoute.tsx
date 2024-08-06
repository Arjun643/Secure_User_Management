import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard'; // Import Dashboard here

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /signin page if not logged in
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <Dashboard />;
};

export default PrivateRoute;
