import React from 'react';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element = {<ErrorPage />} />
x
      </Routes>
    </Router>
  );
}

export default App;
