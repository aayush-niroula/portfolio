import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
    return <>{children}</>;
};

export default ProtectedRoute;
