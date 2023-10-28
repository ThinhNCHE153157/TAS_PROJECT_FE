import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../layout/Header';
import UserList from '../pages/HOD/UserList';
import ClassList from '../pages/HOD/ClassList';
import Dashboard from '../pages/HOD/Dashboard';
import CourseList from '../pages/HOD/CourseList';
import NavBar from '../pages/HOD/layout/NavBar';
import Register from '../pages/commonUser/pages/Register';
import Login from '../pages/commonUser/pages/Login';
import UserProfile from '../pages/commonUser/pages/UserProfile';
import FotgotPassword from '../pages/commonUser/pages/FotgotPassword';
import ResetPassword from '../pages/commonUser/pages/ResetPassword';
import ChangePassword from '../pages/commonUser/pages/ChangePassword';
import ViewCourses from '../pages/commonUser/pages/ViewCourses';

const TheRouter = () => {
    return (
        <Routes>
            //#region Admin
            <Route path="/Admin/Dashboard" exact element={<Dashboard />} />
            <Route path="/Admin/CourseList" exact element={<CourseList />} />
            <Route path="/Admin/ClassList" exact element={<ClassList />} />
            <Route path="/Admin/UserList" exact element={<UserList />} />
            <Route path="/Admin" exact element={<Dashboard />} />
            <Route path="/Admin" exact element={<Header />} />
            //#endregion //#region Common
            <Route path="/commonUser/register" exact element={<Register />} />
            <Route path="/commonUser/Login" exact element={<Login />} />
            <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
            <Route path="/commonUser/FotgotPassword" exact element={<FotgotPassword />} />
            <Route path="/commonUser/ResetPassword" exact element={<ResetPassword />} />
            <Route path="/commonUser/ChangePassword" exact element={<ChangePassword />} />
            <Route path="/commonUser/ViewCourses" exact element={<ViewCourses />} />
            //#endregion
        </Routes>
    );
};

export default TheRouter;
