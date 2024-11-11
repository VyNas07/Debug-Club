import React from 'react'
import './HomePage.css'
import Header from '../../components/Header/Header'
import HeroSection from './HeroSection/HeroSection';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import RankingSection from './RankingSection/RankingSection';
import FeedbackSection from './FeedbackSection/FeedbackSection';
import Rodape from '../../components/Footer/Footer';


const HomePage = () => {
  return (
    <div>
        <Header/>
        <HeroSection/>
        <FeaturesSection/>
        <RankingSection/>
        <FeedbackSection/>
        <Rodape/>
    </div>
  )
}

export default HomePage
