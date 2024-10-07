import React from 'react';
import './HeroSection.css';
import dashboard_img from '../../assets/painel-de-controle.png';

const HeroSection = () => {
  return (
    <section className = "hero-section">
      <h1>Resolva Bugs. Ganhe Pontos. Alcance o topo!</h1>
      <p>
      Contribua para projetos de código aberto, melhore suas habilidades e ganhe reconhecimento.
      Junte-se à comunidade e faça a diferença!
      </p>
      <button className='button-start'>Começar</button>
      <img src= {dashboard_img} alt = 'imagem dashboard' className='dashboard-img'/>
    </section>
  );
};

export default HeroSection;
