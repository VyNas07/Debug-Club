import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import RankingPage from './pages/RankingPage/RankingPage';
import RepositoriesPage from './pages/RepositoriesPage/RepositoriesPage';
import Dashboard from './pages/DashboardPage/Dashboard';

import './App.css';

function App() {
  const [userId, setUserId] = useState(null);  // Usando state para guardar o userId

  useEffect(() => {
    const auth = getAuth();
    
    // Observa o estado de autenticação
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se o usuário estiver logado, guarda o userId
        setUserId(user.uid);
      } else {
        // Se o usuário não estiver logado, reseta o userId
        setUserId(null);
      }
    });
  }, []);

  // Não renderiza o dashboard até que o userId esteja disponível
  if (userId === null) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/repositories" element={<RepositoriesPage />} />
        <Route path="/dashboard" element={<Dashboard userId={userId} />} />
      </Routes>
    </Router>
  );
}

export default App;
