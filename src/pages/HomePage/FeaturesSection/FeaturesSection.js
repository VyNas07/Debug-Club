import React from 'react';
import './FeaturesSection.css';
import medalhaIcon from '../../../assets/IMG-HomePage/medalha.png';
import graficoIcon from '../../../assets/IMG-HomePage/grafico-de-barras.png';
import trofeuIcon from '../../../assets/IMG-HomePage/trofeu.png';
import githubIcon from '../../../assets/IMG-HomePage/github.png';

const features = [
  {
    titulo: "Adquira Pontos e Títulos",
    descricao: "Acumule pontos ao resolver novos bugs e avance rumo a novos títulos",
    icon: medalhaIcon,
  },
  {
    titulo: "Conecte seu GitHub",
    descricao: "Conecte seu GitHub e contribua para projetos de código aberto.",
    icon: githubIcon,
  },
  {
    titulo: "Acompanhe sua Evolução",
    descricao: "Acompanhe sua evolução em tempo real, cada passo leva a conquistas.",
    icon: graficoIcon,
  },
  {
    titulo: "Evolua no Ranking",
    descricao: "Aumente sua posição no ranking global de contribuições.",
    icon: trofeuIcon,
  },
]
const FeaturesSection = () => {
  return (
    <section className = "features">
      <h2>Por que usar o DebugClub?</h2>
      <div className='features-list'>
        {features.map((feature, index) => (
          <div key = {index} className='feature-item'>
            <img src={feature.icon} alt={feature.titulo} className = "feature-icon"/>
            <p>{feature.descricao}</p>
          </div>
        ))};
      </div>
    </section>
  )
}
export default FeaturesSection;
