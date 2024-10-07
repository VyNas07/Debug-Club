import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className = "hero-section">
      <h1>Resolva Bugs. Ganhe Pontos. Alcance o topo!</h1>
      <p>
      Contribua para projetos de código aberto, melhore suas habilidades e ganhe reconhecimento.
      Junte-se à comunidade e faça a diferença!
      </p>
      <button className='button-start'>Começar</button>
    </section>
  );
};

export default HeroSection;
