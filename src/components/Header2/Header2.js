import React, { useState, useEffect } from 'react';
import './Header2.css';
import logoDebugClub from '../../assets/IMG-HomePage/DebugClub.svg';
import { Link, useNavigate } from "react-router-dom";
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import logoMenu from '../../assets/IMG-Gerais/menu.png'; // Importando o ícone do menu

const Header2 = () => {
  const [userProfilePicture, setUserProfilePicture] = useState(profileIcon);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false); // Controla o menu hambúrguer
  const navigate = useNavigate();

  // Função para buscar a foto do perfil do usuário
  const fetchUserProfilePicture = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      setUserProfilePicture(userData.profilePicture || profileIcon);
    } else {
      setUserProfilePicture(profileIcon);
    }
  };

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      fetchUserProfilePicture(userId);
    } else {
      setUserProfilePicture(profileIcon);
    }
  }, []);

  const handleProfileClick = () => {
    // Em telas pequenas, redireciona para /profile
    navigate('/profile');
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const toggleHamburgerMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  const handleDashboardClick = () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      navigate(`/dashboard/${userId}`); // Redireciona para o Dashboard com o userId
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to='/'>
          <img src={logoDebugClub} alt='logo' />
        </Link>
      </div>

      {/* Menu com links normais - telas grandes */}
      <div className="nav-links">
        <Link to="/ranking">Ranking</Link>
         {/* Alterado para chamar a função de navegação */}
        <Link to="/repositories">Repositórios</Link>
      </div>

      {/* Menu Hamburguer para telas menores */}
      <div className="hamburger-menu" onClick={toggleHamburgerMenu}>
        <img src={logoMenu} alt="Menu" />
      </div>

      {/* Menu suspenso - links (só visível em telas pequenas) */}
      {showHamburgerMenu && (
        <div className="hamburger-dropdown">
          <a href="/ranking">Ranking</a>
          <a href="/repositories">Repositórios</a>

          <button onClick={handleLogout} className="menu-option">Sair</button>
        </div>
      )}

      {/* Ícone de perfil fixo à direita do hambúrguer */}
      <button className="button-perfil hamb-profile" onClick={handleProfileClick}>
        <img src={userProfilePicture} alt='Profile' />
      </button>
    </header>
  );
};

export default Header2;
