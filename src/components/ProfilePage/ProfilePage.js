import React from 'react';
import './ProfilePage.css';
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import iconeEdit from '../../assets/IMG-ProfilePage/iconeeditar.png';
import iconeGithub from '../../assets/IMG-ProfilePage/github.png';
import Header from '../HomePage/Header/Header';


const Profile = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aberta':
        return 'green';
      case 'Fechada':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div>
       <Header /> {Header}
    <div className="container">
      <div className="profile-card">
        <button className="edit-button">
          <img src={iconeEdit} alt="botão editar" />
        </button>
        <div className="profile-image">
          <img src={profileIcon} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>Diego Souza</h1>
          <p>Desenvolvedor FrontEnd</p>
          <h3 className="classe">Explorador de Bugs</h3>
          <p>
            "Sou apaixonado por programação e sempre em busca de novos desafios
            que me ajudem a crescer como desenvolvedor. Gosto de resolver
            problemas complexos e contribuir para projetos de código aberto.
            Estou aqui para transformar bugs em soluções eficazes e colaborar
            com a comunidade em busca de melhorias contínuas."
          </p>
        </div>
      </div>
      <main className="main">
        <div className="ranking-contribution-container">
          <div className="ranking-section">
            <div className="ranking-card">
              <h3>Ranking Atual:</h3>
              <span className="ranking-value">4352</span>
            </div>
            <div className="ranking-card">
              <h3>Pontuação:</h3>
              <span className="ranking-value">8</span>
            </div>
          </div>
          <h3 className="historico">Histórico de Contribuições:</h3>
          <div className="contribution-section">
            <ul className="contribution-list">
              <li className="contribution-item">
                <div className="contribution-details">
                  <div className="details-left">
                    <div className="contribution-icon">
                      <img src={iconeGithub} alt="icone-github" />
                    </div>
                    <div>
                      <p className="contribution-title">Corrigir bug de login</p>
                      <p className="contribution-user">user123</p>
                    </div>
                  </div>
                  <span className="contribution-status" style={{ color: getStatusColor('Fechada') }}>
                    Fechada
                  </span>
                </div>
              </li>

              <li className="contribution-item">
                <div className="contribution-details">
                  <div className="details-left">
                    <div className="contribution-icon">
                      <img src={iconeGithub} alt="icone-github" />
                    </div>
                    <div>
                      <p className="contribution-title">Ajustar cores de botão para acessibilidade</p>
                      <p className="contribution-user">claudiosilva09</p>
                    </div>
                  </div>
                  <span className="contribution-status" style={{ color: getStatusColor('Fechada') }}>
                    Fechada
                  </span>
                </div>
              </li>

              <li className="contribution-item">
                <div className="contribution-details">
                  <div className="details-left">
                    <div className="contribution-icon">
                      <img src={iconeGithub} alt="icone-github" />
                    </div>
                    <div>
                      <p className="contribution-title">Erro de "403 Forbidden" ao acessar áreas restritas</p>
                      <p className="contribution-user">arthurlima05</p>
                    </div>
                  </div>
                  <span className="contribution-status" style={{ color: getStatusColor('Aberta') }}>
                    Aberta
                  </span>
                </div>
              </li>
              {/* pode adicionar outros itens de contribuição aqui */}
            </ul>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default Profile;
