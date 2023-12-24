import React, { useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../../hooks/useAuth';
import { alertSuccess } from '../../component/AlertComponent';
import { ToastContainer } from 'react-toastify';

export const RequireAuth = ({ allow }) => {
    const { auth: authValue } = useAuth();
    const location = useLocation();
    const auth = useSelector((state) => state.auth?.user);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token.toString());
    const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (!auth) {
        return <Navigate to={{ pathname: '/login', state: { from: location } }} replace />;
    } else {
        if (Array.isArray(userRole)) {
            return userRole.find((role) => allow.includes(role)) ? (
                <Outlet />
            ) : (
                <Navigate to={{ pathname: '/unauthorized', state: { from: location } }} replace />
            );
        } else {
            return allow.includes(userRole) ? (
                <Outlet />
            ) : (
                <Navigate to={{ pathname: '/unauthorized', state: { from: location } }} replace />
            );

        }
    }
};

export const RequireLogin = () => {
    const nav = useNavigate();
    const auth = useSelector((state) => state.auth.user);
    const location = useLocation();
    console.log(auth);
    if (auth != null) {
        return <Navigate to={{ pathname: '/', state: { from: location } }} replace />;

    } else {
        return <Outlet />;
    }
};