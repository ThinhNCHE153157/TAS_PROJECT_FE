import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../layout/Header';
import UserList from '../pages/HOD/ManageUser/UserList';
import ClassList from '../pages/HOD/ClassList';
import Dashboard from '../pages/HOD/Dashboard';
import CourseList from '../pages/HOD/ManageCourse/CourseList';
import Register from '../pages/commonUser/pages/Register';
import Login from '../pages/commonUser/pages/Login';
import UserProfile from '../pages/commonUser/pages/UserProfile';
import EditUserProfile from '../pages/commonUser/pages/EditUserProfile';
import UserManagement from '../pages/commonUser/pages/UserManagement';
import CourseDetail from '../pages/HOD/ManageCourse/CourseDetail';
const TheRouter = () => {
    return (
        <Routes>
            {/* Admin */}
            <Route path="/Admin/Dashboard" exact element={<Dashboard />} />
            <Route path="/Admin/CourseList" exact element={<CourseList />} />
            <Route path="/Admin/ClassList" exact element={<ClassList />} />
            <Route path="/Admin/UserList" exact element={<UserList />} />
            <Route path="/Admin" exact element={<Dashboard />} />
            <Route path="/Admin" exact element={<Header />} />
            <Route path="/Admin/CourseDetail/:id" exact element={<CourseDetail />} />
            {/* Common */}
            <Route path="/commonUser/Register" exact element={<Register />} />
            <Route path="/commonUser/Login" exact element={<Login />} />
            <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
            <Route path="/commonUser/userprofile/edit" exact element={<EditUserProfile />} />
            <Route path="/commonUser/usermanagement" exact element={<UserManagement />} />
        </Routes>
    );
};

export default TheRouter;
