import React, { useState, useEffect } from 'react';
import './Header2.css';
import logoDebugClub from '../../assets/IMG-HomePage/DebugClub.svg';
import { Link, useNavigate } from "react-router-dom";
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Header2 = () => {
  const [userProfilePicture, setUserProfilePicture] = useState(profileIcon);
  const [showMenu, setShowMenu] = useState(false); // Controla o menu suspenso
  const navigate = useNavigate();

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
    setShowMenu(!showMenu);
  };

  const handleViewProfile = () => {
    setShowMenu(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setShowMenu(false);
    auth.signOut();
    navigate('/');
  };

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
        <button className='button-perfil' onClick={handleProfileClick}>
          <img src={userProfilePicture} alt='Profile' />
        </button>
        {showMenu && (
          <div className="profile-menu">
            <button onClick={handleViewProfile} className="menu-option">Visualizar Perfil</button>
            <button onClick={handleLogout} className="menu-option">Sair</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header2;
