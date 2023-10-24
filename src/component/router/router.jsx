import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../layout/Header'
import UserList from '../pages/HOD/UserList'
import ClassList from '../pages/HOD/ClassList'
import Dashboard from '../pages/HOD/Dashboard'
import CourseList from '../pages/HOD/CourseList'
import NavBar from '../pages/HOD/layout/NavBar'
import Register from '../pages/commonUser/pages/Register';
import Login from '../pages/commonUser/pages/Login';



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


    </Routes>
  )
}

export default TheRouter;
