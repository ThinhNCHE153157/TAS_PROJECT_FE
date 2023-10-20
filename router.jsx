import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Userdetail from '../pages/HOD/UserDetail';
import Header from '../layout/Header';
import Register from '../pages/commonUser/pages/Register';
import Login from '../pages/commonUser/pages/Login';
const TheRouter = () => {
    return (
        <Routes>
            {/* <Route path='' exact element={<RouterHere />} /> */}
            {/* <Route path='/header' exact element={<Header />} /> */}
            <Route path="/Student" exact element={<Header />} />
            <Route path="/face" exact element={<Userdetail />} />
            <Route path="/commonUser/register" exact element={<Register />} />
            <Route path="/commonUser/Login" exact element={<Login />} />
        </Routes>
    );
};

export default TheRouter;
