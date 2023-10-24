import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../layout/Header'
import UserList from '../pages/HOD/UserList'
import ClassList from '../pages/HOD/ClassList'
import Dashboard from '../pages/HOD/Dashboard'
import CourseList from '../pages/HOD/CourseList'
import NavBar from '../pages/HOD/layout/NavBar'




const TheRouter = () => {
  return (
    <Routes>
      {/* <Route path='' exact element={<RouterHere />} /> */}
      {/* <Route path='/header' exact element={<Header />} /> */}
      <Route path='/Admin/NavBar' exact element={<NavBar />} />

      //#region Admin
      <Route path='/Admin/Dashboard' exact element={<Dashboard />} />
      <Route path='/Admin/CourseList' exact element={<CourseList />} />
      <Route path='/Admin/ClassList' exact element={<ClassList />} />
      <Route path='/Admin/UserList' exact element={<UserList />} />
      <Route path='/Admin' exact element={<Dashboard />} />
      <Route path='/Admin' exact element={<Header />} />
    //#endregion


    </Routes>
  )
}

export default TheRouter