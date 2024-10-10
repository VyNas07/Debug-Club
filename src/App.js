import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import './App.css';
import RankingSection from './components/RankingSection/RankingSection';
import FeedbackSection from './components/FeedbackSection/FeedbackSection';
import Rodape from './components/Rodape/Rodape';

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




