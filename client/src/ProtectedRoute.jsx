import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProtectedRoute({ Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem('accessToken');
    if (!login) {
      navigate('/login');
      toast.success(`Login first`);
    }
  });
  return (
    <>
      <Component />
    </>
  );
}

export default ProtectedRoute;
