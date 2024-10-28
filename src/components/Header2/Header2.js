import React from 'react';
import './Header2.css';
import logoDebugClub from '../../assets/IMG-HomePage/DebugClub.svg';
import { Outlet, Link } from "react-router-dom";
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';

const Header2 = () => {
    return (
      <header className="header">
        <div className="logo">
          <Link to= '/'>
          <img src={logoDebugClub} alt='logo' />
          </Link>
        </div>
        
        <nav className="nav-links">
          <a href='#ranking'>Ranking</a>
          <a href='#dashboard'>Dashboard</a>
          <a href='#repositorios'>Repositórios</a>
          <Link to = '/profile'>
          <button className='button-perfil'>
            <img src={profileIcon}/>
          
          </button>
          </Link>
        </nav>
      </header>
    );
  };
  
  export default Header2;