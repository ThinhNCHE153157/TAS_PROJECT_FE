import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../layout/Header'
import UserList from '../pages/HOD/ManageUser/UserList'
import ClassList from '../pages/HOD/ClassList'
import Dashboard from '../pages/HOD/Dashboard'
import CourseList from '../pages/HOD/ManageCourse/CourseList'
import Register from '../pages/commonUser/pages/Register'
import Login from '../pages/commonUser/pages/Login'
import UserProfile from '../pages/commonUser/pages/UserProfile'
import EditUserProfile from '../pages/commonUser/pages/EditUserProfile'
import UserManagement from '../pages/commonUser/pages/UserManagement'
import ViewCourses from '../pages/commonUser/pages/ViewCourses'
import ChangePassword from '../pages/commonUser/pages/ChangePassword'
import FotgotPassword from '../pages/commonUser/pages/FotgotPassword'
import ResetPassword from '../pages/commonUser/pages/ResetPassword'
const TheRouter = () => {
  return (
    <Routes>
      {/* Admin */}
      <Route path='/Admin/Dashboard' exact element={<Dashboard />} />
      <Route path='/Admin/CourseList' exact element={<CourseList />} />
      <Route path='/Admin/ClassList' exact element={<ClassList />} />
      <Route path='/Admin/UserList' exact element={<UserList />} />
      <Route path='/Admin' exact element={<Dashboard />} />
      <Route path='/Admin' exact element={<Header />} />

      {/* Common */}
      <Route path="/commonUser/Register" exact element={<Register />} />
      <Route path="/commonUser/Login" exact element={<Login />} />
      <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
      <Route path="/commonUser/userprofile/edit" exact element={<EditUserProfile />} />
      <Route path="/commonUser/usermanagement" exact element={<UserManagement />} />
      <Route path="/commonUser/FotgotPassword" exact element={<FotgotPassword />} />
      <Route path="/commonUser/ResetPassword" exact element={<ResetPassword />} />
      <Route path="/commonUser/ChangePassword" exact element={<ChangePassword />} />
      <Route path="/commonUser/ViewCourses" exact element={<ViewCourses />} />
    </Routes>
  )
}

export default TheRouter;
