import React, { useState, useEffect } from 'react';
import './Header2.css';
import logoDebugClub from '../../assets/IMG-HomePage/DebugClub.svg';
import { Link } from "react-router-dom";
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import { auth, db } from '../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const Header2 = () => {
  const [userProfilePicture, setUserProfilePicture] = useState(profileIcon); // Inicializa com a imagem padrão

  // Função para buscar dados do usuário
  const fetchUserProfilePicture = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data(); // Usar a mesma convenção
      setUserProfilePicture(userData.profilePicture || profileIcon);
    } else {
      setUserProfilePicture(profileIcon); // Se não encontrar, usar imagem padrão
    }
  };

  useEffect(() => {
    const userId = auth.currentUser?.uid; // Corrigido para auth.currentUser

    if (userId) {
      fetchUserProfilePicture(userId);
    } else {
      setUserProfilePicture(profileIcon); // Se não houver usuário, usar imagem padrão
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to='/'>
          <img src={logoDebugClub} alt='logo' />
        </Link>
      </div>
      
      <nav className="nav-links">
        <a href='#ranking'>Ranking</a>
        <a href='#dashboard'>Dashboard</a>
        <a href='#repositorios'>Repositórios</a>
        <Link to='/profile'>
          <button className='button-perfil'>
            <img src={userProfilePicture} alt='Profile' />
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header2;
