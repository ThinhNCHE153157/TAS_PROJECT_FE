import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Userdetail from '../pages/HOD/UserDetail'
import Header from '../layout/Header'





const TheRouter = () => {
  return (
    <Routes>
      {/* <Route path='' exact element={<RouterHere />} /> */}
      {/* <Route path='/header' exact element={<Header />} /> */}
      <Route path='/Student' exact element={<Header />} />
      <Route path='/face' exact element={<Userdetail />} />


    </Routes>
  )
}

export default TheRouter