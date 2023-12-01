import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../../../hooks/useAuth';

export const RequireAuth = ({ allow }) => {
    const { auth: authValue } = useAuth();
    const location = useLocation();
    const auth = useSelector((state) => state.auth?.user);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token.toString());
    const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const roles = [...userRole];
    console.log(authValue);
    if (!auth) {
        return <Navigate to={{ pathname: '/login', state: { from: location } }} replace />;
    } else {
        return roles.find((role) => allow.includes(role)) ? (
            <Outlet />
        ) : (
            <Navigate to={{ pathname: '/unauthorized', state: { from: location } }} replace />
        );
    }
};

export const RequireLogin = () => {
    const auth = useSelector((state) => state.auth?.user);
    const location = useLocation();
    console.log(auth);
    if (auth !== null) {
        return <Outlet />;
    } else {
        return <Navigate to={{ pathname: '/login', state: { from: location } }} replace />;
    }
};