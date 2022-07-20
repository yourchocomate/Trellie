import React from 'react';
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks';
import { Loader } from './ui';

const ProtectedRoutes = () => {

    const auth = useAuth();

    return auth.user ? <Outlet /> : <Loader />;

}

export default ProtectedRoutes;