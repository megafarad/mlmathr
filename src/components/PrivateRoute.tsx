import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./context/AuthContext.tsx";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
    if (!user) return <Navigate to={`/auth?redirect=1&to=${encodeURIComponent(location.pathname)}`} />;

    return children;
};

export default PrivateRoute;
