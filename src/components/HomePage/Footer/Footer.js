import React from 'react';
import logoDebugClub from '../../../assets/IMG-HomePage/DebugClub.svg';
import facebookLogo from '../../../assets/IMG-HomePage/facebook.png';
import instagramLogo from '../../../assets/IMG-HomePage/instagram.png';
import './Footer.css';


const Rodape = () => {
  return (
    <footer className='rodape-section'>
      <div className='rodape-content'>
          <img src={logoDebugClub} alt='logo' className='logo-img'/>
          <div className='contato-rodape'>
            <h3>Contato</h3>
            <p>+55 81 99999 9999</p>
            <p>contato@debugclub.com</p>
            <ul className='icons-rodape'>
              <li>
                <a href='/' aria-label='Facebook'>
                  <img src={facebookLogo} alt='Facebook' className='facebook-img'/>
                </a>
              </li>
              <li>
                <a href='/' aria-label='Instagram'>
                  <img src={instagramLogo} alt='Instagram' className='instagram-img'/>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='endereco-rodape'>
          <p>Rua Aqui Proximo, 19 - Madalena</p>
          <p>Recife - Pernambuco</p>
        </div>
    
    </footer>
  );
};

export default Rodape;
