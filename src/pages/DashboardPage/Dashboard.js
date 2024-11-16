import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header2 from '../../components/Header2/Header2';
import ProfileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import ContributionChart from '../../components/ContributionChart/ContributionChart';
import ContributionReviewChart from '../../components/ContributionReviewChart/ContributionReviewChart';
import { getUserContributionCounts } from '../../components/countCollectionDocuments';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Dashboard() {
    return (
        <div className="header-content">
            <Header2 />
            <div className="container-general">
                <div className="container-separate">
                    <div className="profile">
                        
                            <img src={ProfileIcon} alt="Foto do Perfil" />
                        
                        <h2>Diego Souza</h2>
                        <p className="role">Explorador de Bugs</p>
                    </div>

          <div className="reviews">
            <h3>Contribuições:</h3>
            <ContributionReviewChart />
          </div>
        </div>

                <div className="second-container-separate">
                    <div className="progress">
                        <h3>Próximo Título:</h3>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '80%' }}></div>
                            
                        </div>
                        <p>Desbravador de Problemas</p>
                    </div>

                    <div className="last-contribution">
                        <h3>Última Contribuição:</h3>
                        <div className="contribution-detail">
                            <p>Corrigir bug de login</p>
                            <div className="status-date">
                            <span className="status">Fechada</span>
                            <p className="date">21/09/2020</p>
                        </div>
                        </div>
                    </div>

                    <div className="contributions">
                        <div className="chart">
                        <h3>Histórico de Contribuições:</h3>
                            <ContributionChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;