// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authUtils } from '../utils/authUtils';

interface ProtectedRouteProps {
  children: React.ReactElement;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  const hasValidToken = isAuthenticated && !authUtils.isTokenExpired();

  if (!hasValidToken) {
    // Déconnexion forcée si token invalide ou expiré
    authUtils.logout();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
