import React from 'react'
import './Header.css';
import logoDebugClub from '../../../assets/IMG-HomePage/DebugClub.svg'

const Header = () => {
  return (
    <header className = "header">
      <div className = "logo"><img src={logoDebugClub} alt = 'logo'/></div>
      <nav className = "nav-links">
        <a href='#ranking'>Ranking</a>
        <a href='#dashboard'>Dashboard</a>
        <a href='#repositorios'>Repositórios</a>
        <button className='button-login'>Entrar | Registrar-se</button>
      </nav>
    </header>
  );
};

export default Header;
