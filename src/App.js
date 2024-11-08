import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import RankingPage from './pages/RankingPage/RankingPage';
import RepositoriesPage from './pages/RepositoriesPage/RepositoriesPage';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element = {<ErrorPage />} />
        <Route path="/profileedit" element = {<ProfileEdit />} />
        <Route path="/ranking" element = {<RankingPage/>} />
        <Route path="/repositories" element = {<RepositoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;