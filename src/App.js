import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useHistory, useNavigate } from 'react-router-dom';
//import firebase from 'firebase/app';
import {auth} from './firebase';
import HomePage from './components/HomePage';
import MyJobs from './components/MyJobs'
import JobPost from './components/JobPost'
import LoginPage from './components/LoginPage'
import EmployerHomePage from './components/EmployerHomePage';
import EmployeeHomePage from './components/EmployeeHomePage';
import JobOverview from './components/JobOverview'
import NewSignUp from './components/NewSignUp';
import TempLogin from './components/TempLogin';
import { AuthProvider } from './contexts/AuthContext';
import JobPosting from './components/JobPosting';
import ProfilePage from './components/EmployeeProfileForm';
import EmployeeProfileForm from './components/EmployeeProfileForm';
import TempPage from './components/TempPage';
import MyPostedJobs from './components/MyPostedJobs';
import ListApplicants from './components/ListApplicants';
import UserProfile from './components/UserProfile';


const PostJobsPage = () => {
  return (
    <div>
      <h1>Post Jobs Page</h1>
      {/* Add your job posting form here */}
    </div>
  );
};

const App = () => {
  const [currentUserId, setcurrentUserId] = useState()
  
  return (
    <Router>
      <AuthProvider>
      <Routes>
      <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path='/new' element={<NewSignUp />}></Route>
        <Route exact path="/post-jobs" element={<JobPost />}></Route>
        <Route exact path='/my-jobs' element={<MyJobs />}></Route>
        <Route exact path="/employer-home-page" element={<EmployerHomePage />}>
          
        </Route>
        <Route exact path="/employee-home-page" element={<EmployeeHomePage />}></Route>
          <Route exact path="/employee-home-page/profile" element={<TempPage />}></Route>
          
        
        <Route exact path ="employer-signup" element={<LoginPage currentUserId={currentUserId} setCurrentUserId={setcurrentUserId} isEmployer={true} />}>
        </Route>

        <Route exact path ="employee-signup" element={<LoginPage currentUserId={currentUserId} setCurrentUserId={setcurrentUserId} isEmployer={false} />}>
        </Route>
        <Route exact path='jobs/:jobId' element={<JobOverview />}></Route>
        <Route exact path='employee-home-page/applyjob/:jobId' element={<JobPosting />}></Route>
        <Route exact path='employer-home-page/my-jobs' element={<MyPostedJobs />}></Route>
        <Route exact path='employer-home-page/my-jobs/:jobId' element={<ListApplicants />}></Route>
        <Route exact path='users/:userId' element={<UserProfile/>}></Route>
        </Routes>
        </AuthProvider>
    </Router>
  );
};

export default App;
