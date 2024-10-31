import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user)
        })
        return () => unsubscribe()
    }, [auth])
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/dashboard/login" replace />;
    }
    return children || <Outlet />;
};

export default ProtectedRoute;
