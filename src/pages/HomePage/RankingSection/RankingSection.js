import React from 'react'
import './RankingSection.css'
import RankingImg from '../../../assets/IMG-HomePage/Ranking.png'

const RankingSection = () => {
  return (
    <section className = 'ranking-section'>
      <div className='ranking-text'>
        <h2>Ranking de Contribuições</h2>
        </div>
        <img src={RankingImg} alt = 'Imagem de Ranking' className='ranking-img'/>
    </section>
  );;
}

export default RankingSection;
