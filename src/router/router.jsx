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
import UserDetail from '../pages/HOD/ManageUser/UserDetail';
import ChangePassword from '../pages/commonUser/pages/ChangePassword';
import FotgotPassword from '../pages/commonUser/pages/ForgotPassword';
import ResetPassword from '../pages/commonUser/pages/ResetPassword';
import TeacherList from '../pages/HOD/ManageUser/ManageTeacher/TeacherList';
import Homepage from '../pages/HomePage/Pages/Homepage';
import QuestionList from '../pages/HOD/ManageQuestion/ListQuestion';
import { RequireAuth } from '../pages/commonUser/RequireAuth';
import Unauthorized from '../pages/commonUser/pages/Unauthorized';
import DetailTest from '../pages/HOD/ManageTest/DetailTest';
import TestDetail from '../pages/HOD/ManageCourse/TestDetail';
import Course from '../pages/HomePage/Pages/Course';
import Tests from '../pages/HomePage/Pages/Tests';
import TakeTest from '../pages/HomePage/Pages/TakeTest';
import TestList from '../pages/HOD/ManageTest/ListTest';
import { ROUTES, ROLE } from '../Utils/Constants';
import ChooseTestPart from '../pages/HomePage/Pages/ChooseTestPart';
import CourseLearning from '../pages/HomePage/Pages/CourseLearning';
import Order from '../pages/Payment/Order';
import StudyProgress from '../pages/HomePage/Pages/StudyProgress';
import FlashCard from '../pages/HomePage/Pages/FlashCard';
import ViewCourse from '../pages/Enterprise/ManageCourse/ViewCourse';
import AddCourse from '../pages/Enterprise/ManageCourse/AddCourse';
const TheRouter = () => {
  return (
    <Routes>
      <Route path='/Order' exact element={<Order />} />
      {/* Homepage */}
      <Route path="/" exact element={<Homepage />} />
      <Route path="/Course/:id" exact element={<Course />} />
      <Route path="/Test" exact element={<Tests />} />
      <Route path="/TakeTest" exact element={<TakeTest />} />
      <Route path="/TestDetail" exact element={<ChooseTestPart />} />
      <Route path="/CourseLearning" exact element={<CourseLearning />} />
      <Route path="/TestDetail/:id" exact element={<ChooseTestPart />} />
      <Route path="/StudyProgress" exact element={<StudyProgress />} />
      <Route path="/Flashcards" exact element={<FlashCard />} />

      {/* <Route path="/TestDetail/:data" exact element={<ChooseTestPart />} /> */}
      {/* Admin */}
      <Route element={<RequireAuth allow={ROLE.Admin} />}>
        <Route path='/Admin/Dashboard' exact element={<Dashboard />} />
        <Route path='/Homepage' exact element={<Homepage />} />
        <Route path='/Admin/CourseList' exact element={<CourseList />} />
        <Route path='/Admin/ClassList' exact element={<ClassList />} />
        <Route path='/Admin/TeacherList' exact element={<TeacherList />} />
        <Route path='/Admin/UserList' exact element={<UserList />} />
        <Route path='/Admin' exact element={<Dashboard />} />
        <Route path="/Admin/ClassList/Detail/:id" exact element={<ClassDetail />} />
        <Route path="/Admin/CourseDetail/:id" exact element={<CourseDetail />} />
        <Route path='/Admin/UserDetail/:id' exact element={<UserDetail />} />
        <Route path="/Admin/CourseDetail/:courseId/:testId" exact element={<TestDetail />} />
      </Route>
      {/* Common */}
      <Route path={ROUTES.common.register} exact element={<Register />} />
      <Route path={ROUTES.common.login} exact element={<Login />} />
      <Route path="/commonUser/userprofile" exact element={<UserProfile />} />
      <Route path="/commonUser/userprofile/edit" exact element={<EditUserProfile />} />
      <Route path="/commonUser/usermanagement" exact element={<UserManagement />} />
      <Route path="/commonUser/FotgotPassword" exact element={<FotgotPassword />} />
      <Route path="/commonUser/ResetPassword" exact element={<ResetPassword />} />
      <Route path="/commonUser/ChangePassword" exact element={<ChangePassword />} />
      <Route path={ROUTES.common.login} exact element={<Login />} />
      <Route path={ROUTES.common.register} exact element={<Register />} />
      <Route path={ROUTES.common.login} exact element={<Login />} />
      <Route path={ROUTES.common.register} exact element={<Register />} />
      <Route path={ROUTES.common.login} exact element={<Login />} />
      <Route path={ROUTES.common.unauthorized} exact element={<Unauthorized />} />
      <Route path="/ManageTest/ListTest" exact element={<TestList />} />
      <Route path="/ManageTest/DetailTest" exact element={<DetailTest />} />
      <Route path="/ManageQuestion/ListQuestion" exact element={<QuestionList />} />

      {/* Enterprise */}
      <Route path='/Enterprise/ViewCourse' exact element={<ViewCourse />} />
      <Route path='/Enterprise/AddCourse' exact element={<AddCourse />} />
    </Routes>
  )

}
export default TheRouter
