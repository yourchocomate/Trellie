import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks';
const AuthRoutes = () => {

    const auth = useAuth();

    return auth.user ? <Navigate to='/dashboard'/> : <Outlet />;
    
}

export default AuthRoutes;