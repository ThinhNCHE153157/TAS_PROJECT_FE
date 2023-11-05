import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ allow }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.role?.find((role) => allow.includes(role)) ? (
        <Outlet />
    ) : auth?.userName ? (
        <Navigate to={{ pathname: '/unauthorized', state: { from: location } }} replace />
    ) : (
        <Navigate to={{ pathname: '/login', state: { from: location } }} replace />
    );
};

export default RequireAuth;
