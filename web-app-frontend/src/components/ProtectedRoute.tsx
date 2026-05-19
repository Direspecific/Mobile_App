import React, { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdminUser } from "../services/api";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const isAdmin = isAdminUser(user);

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      logout();
    }
  }, [isAuthenticated, isAdmin, logout]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
