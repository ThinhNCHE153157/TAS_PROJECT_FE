import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from '../pages/HOD/ManageUser/UserList';
import Dashboard from '../pages/HOD/Dashboard';
import CourseList from '../pages/HOD/ManageCourse/CourseList';
import Register from '../pages/commonUser/pages/Register';
import Login from '../pages/commonUser/pages/Login';
import UserProfile from '../pages/commonUser/pages/UserProfile';
import EditUserProfile from '../pages/commonUser/pages/EditUserProfile';
import UserManagement from '../pages/commonUser/pages/UserManagement';
import ClassDetail from '../pages/HOD/ManageClass/ClassDetail'
import CourseDetail from '../pages/HOD/ManageCourse/CourseDetail';
import ClassList from '../pages/HOD/ManageClass/ClassList';
import ChangePassword from '../pages/commonUser/pages/ChangePassword';
import FotgotPassword from '../pages/commonUser/pages/FotgotPassword';
import ResetPassword from '../pages/commonUser/pages/ResetPassword';
import { ROUTES } from '../../Utils/RouteConstants';
const TheRouter = () => {
  return (
    <Routes>
      {/* Admin */}
      <Route path='/Admin/Dashboard' exact element={<Dashboard />} />
      <Route path='/Admin/CourseList' exact element={<CourseList />} />
      <Route path='/Admin/ClassList' exact element={<ClassList />} />
      <Route path='/Admin/UserList' exact element={<UserList />} />
      <Route path='/Admin' exact element={<Dashboard />} />
      <Route path="/Admin/ClassList/Detail/:id" exact element={<ClassDetail />} />
      <Route path="/Admin/CourseDetail/:id" exact element={<CourseDetail />} />
      {/* Common */}
            <Route path={ROUTES.common.register} exact element={<Register />} />
            <Route path={ROUTES.common.login} exact element={<Login />} />
            <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
            <Route path="/commonUser/userprofile/edit" exact element={<EditUserProfile />} />
            <Route path="/commonUser/usermanagement" exact element={<UserManagement />} />
            <Route path="/commonUser/FotgotPassword" exact element={<FotgotPassword />} />
            <Route path="/commonUser/ResetPassword" exact element={<ResetPassword />} />
            <Route path="/commonUser/ChangePassword" exact element={<ChangePassword />} />

    </Routes>
  )
}

