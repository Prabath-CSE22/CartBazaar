import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = () => {
    const [auth, setAuth] = useState(false);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true); // For handling async data fetching
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth');
                if (response.data.decoded) {
                    setAuth(true);
                    setRole(response.data.decoded.role);
                }
            } catch (err) {
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>; // Display a loading state while checking auth

    const isAdminRoute = location.pathname === '/admin'; // Check if current path is '/admin'

    if (!auth) {
        return <Navigate to="/" />;
    }

    if (isAdminRoute && role !== 'admin') {
        return <Navigate to="/" />;
    }
    if(!isAdminRoute && role === 'admin') {
        return <Navigate to="/admin" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
