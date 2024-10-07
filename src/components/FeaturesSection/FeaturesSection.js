import React from 'react';
import './FeaturesSection.css';
import medalhaIcon from '../../assets/medalha.png';
import graficoIcon from '../../assets/grafico-de-barras.png';
import trofeuIcon from '../../assets/trofeu.png';
import githubIcon from '../../assets/github.png';

const features = [
  {
    titulo: "Adquira Pontos e Títulos",
    descricao: "Ganhe pontos e títulos ao resolver bugs",
    icon: medalhaIcon,
  },
  {
    titulo: "Conecte seu GitHub",
    descricao: "Conecte seu GitHub e contribua para projetos de código aberto.",
    icon: githubIcon,
  },
  {
    titulo: "Acompanhe sua Evolução",
    descricao: "Veja sua evolução em tempo real.",
    icon: graficoIcon,
  },
  {
    titulo: "Evolua no Ranking",
    descricao: "Suba no ranking global de contribuições.",
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
