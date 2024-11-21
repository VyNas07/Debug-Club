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
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

function App() {
  const [userId, setUserId] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // Estado para carregamento da autenticação

  useEffect(() => {
    const auth = getAuth();

    // Observa o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Define o userId se o usuário estiver autenticado
      } else {
        setUserId(null); // Reseta o userId se não houver usuário autenticado
        console.log('Usuário não autenticado. problema no APP.js ');
      }
      setLoadingAuth(false); // Finaliza o carregamento
    });

    return () => unsubscribe(); // Limpa o observador ao desmontar o componente
  }, []);

  // Exibe a tela de carregamento enquanto verifica a autenticação
  if (loadingAuth) {
    return <LoadingScreen />;
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
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
      </Router>
  );
}

export default App;
