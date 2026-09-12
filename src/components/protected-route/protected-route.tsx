import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authIsAuthenticated } from '../../services/slices/authSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuth = useSelector(authIsAuthenticated);

  if (!isAuth) {
    navigate('/login', { replace: true });
    return null;
  }

  return children;
};
