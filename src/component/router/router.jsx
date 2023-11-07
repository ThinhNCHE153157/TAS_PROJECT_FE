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
import ForgotPassword from '../pages/commonUser/pages/ForgotPassword';
import ResetPassword from '../pages/commonUser/pages/ResetPassword';
import { RequireAuth, RequireLogin } from '../pages/commonUser/RequireAuth';
import ListTestDetail from '../pages/HOD/ManageTest/ListTestDetail';
import TestList from '../pages/HOD/ManageTest/ListTest';
import RequireAuth from '../pages/commonUser/RequireAuth';
import { ROUTES, ROLE } from '../../Utils/Constants';
import Unauthorized from '../pages/commonUser/pages/Unauthorized';
const TheRouter = () => {
  return (
    <Routes>
      {/* Admin */}
      <Route element={<RequireAuth allow={ROLE.Admin} />}>
        <Route path="/Admin/Dashboard" exact element={<Dashboard />} />
        <Route path="/Admin/CourseList" exact element={<CourseList />} />
        <Route path="/Admin/ClassList" exact element={<ClassList />} />
        <Route path="/Admin/UserList" exact element={<UserList />} />
        <Route path="/Admin" exact element={<Dashboard />} />
        <Route path="/Admin/ClassList/Detail/:id" exact element={<ClassDetail />} />
        <Route path="/Admin/CourseDetail/:id" exact element={<CourseDetail />} />
      </Route>
      {/* Common */}
      <Route element={<RequireLogin />}>
        <Route path={ROUTES.common.register} exact element={<Register />} />
        <Route path={ROUTES.common.login} exact element={<Login />} />
      </Route>
      <Route path={ROUTES.common.unauthorized} exact element={<Unauthorized />} />
      <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
      <Route path="/commonUser/userprofile/edit" exact element={<EditUserProfile />} />
      <Route path="/commonUser/usermanagement" exact element={<UserManagement />} />
      <Route path="/commonUser/FotgotPassword" exact element={<FotgotPassword />} />
      <Route path="/commonUser/ResetPassword" exact element={<ResetPassword />} />
      <Route path="/commonUser/ChangePassword" exact element={<ChangePassword />} />
    </Routes>
  );
};

export default TheRouter;
