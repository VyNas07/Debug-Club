import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <header className = "header">
      <div className = "logo">DebugClub</div>
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
