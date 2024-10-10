import React from 'react'
import './RankingSection.css'
import RankingImg from '../../assets/Ranking.png'

const RankingSection = () => {
  return (
    <section className = 'ranking-section'>
        <h2>Ranking de Contribuições</h2>
        <img src={RankingImg} alt = 'Imagem de Ranking' className='ranking-img'/>
    </section>
  );;
}

export default RankingSection;