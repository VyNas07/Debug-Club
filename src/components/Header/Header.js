import React from 'react';
import './Header.css';
import logoDebugClub from '../../assets/IMG-HomePage/DebugClub.svg';
import { Outlet, Link } from "react-router-dom";




const Header = () => {
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
        <Link to = '/login'>
        <button className='button-login'>Entrar | Registrar-se</button>
        </Link>

         
         
      </nav>
    </header>
  );
};

export default Header;
