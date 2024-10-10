import React from 'react';
import Header from './components/HomePage/Header/Header'
import HeroSection from './components/HomePage/HeroSection/HeroSection';
import FeaturesSection from './components/HomePage/FeaturesSection/FeaturesSection';
import './App.css';
import RankingSection from './components/HomePage/RankingSection/RankingSection';
import FeedbackSection from './components/HomePage/FeedbackSection/FeedbackSection';
import Rodape from './components/HomePage/Rodape/Rodape';

function App() {
  return (
    <div className = "App">
      <Header/>
      <HeroSection/>
      <FeaturesSection/>
      <RankingSection/>
      <FeedbackSection/>
      <Rodape/>
    </div>
  );
}

export default App;




