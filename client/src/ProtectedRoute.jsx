import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let login = localStorage.getItem('accessToken');
    if (!login) {
      toast.error('User not logged in');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
