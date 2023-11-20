<<<<<<< HEAD
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
import ListClass from '../pages/commonUser/pages/ListClass';
import CreateClass from '../pages/commonUser/pages/CreateClass';
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

            {/* Common */}
            <Route path="/commonUser/Register" exact element={<Register />} />
            <Route path="/commonUser/Login" exact element={<Login />} />
            <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
            <Route path="/commonUser/userprofile/edit" exact element={<EditUserProfile />} />
            <Route path="/commonUser/usermanagement" exact element={<UserManagement />} />
            <Route path="/commonUser/listclass" exact element={<ListClass />} />
            <Route path="/commonUser/CreateClass" exact element={<CreateClass />} />
        </Routes>
    );
};

export default TheRouter;
=======
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
import { RequireAuth } from '../pages/commonUser/RequireAuth';
import ListTestDetail from '../pages/HOD/ManageTest/ListTestDetail';
import TestList from '../pages/HOD/ManageTest/ListTest';
import DetailTest from '../pages/HOD/ManageTest/DetailTest';
import QuestionList from '../pages/HOD/ManageQuestion/ListQuestion';
import { ROUTES, ROLE } from '../../Utils/Constants';
import Unauthorized from '../pages/commonUser/pages/Unauthorized';
import TestDetail from '../pages/HOD/ManageCourse/TestDetail';

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
        <Route path="/Admin/CourseDetail/:courseId/:testId" exact element={<TestDetail />} />
      </Route>
      {/* Common */}
      <Route path={ROUTES.common.register} exact element={<Register />} />
      <Route path={ROUTES.common.login} exact element={<Login />} />
      <Route path={ROUTES.common.register} exact element={<Register />} />
      <Route path={ROUTES.common.login} exact element={<Login />} />
      <Route path={ROUTES.common.register} exact element={<Register />} />
      <Route path={ROUTES.common.login} exact element={<Login />} />
      <Route path={ROUTES.common.unauthorized} exact element={<Unauthorized />} />
      <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
      <Route path="/commonUser/userprofile/edit" exact element={<EditUserProfile />} />
      <Route path="/commonUser/usermanagement" exact element={<UserManagement />} />
      <Route path="/commonUser/ForgotPassword" exact element={<ForgotPassword />} />
      <Route path="/commonUser/ResetPassword" exact element={<ResetPassword />} />
      <Route path="/commonUser/ChangePassword" exact element={<ChangePassword />} />
      <Route path="/ManageTest/ListTest" exact element={<TestList />} />
      <Route path="/ManageTest/DetailTest" exact element={<DetailTest />} />
      <Route path="/ManageQuestion/ListQuestion" exact element={<QuestionList />} />
    </Routes>
  );
};

export default TheRouter;
>>>>>>> bdf76ae24fe29137c503abd4c166fe141caade78
