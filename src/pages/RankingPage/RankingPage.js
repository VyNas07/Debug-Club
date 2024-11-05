import React from 'react';
import './RankingPage.css';
import winnerIcon from '../../assets/IMG-RankingPage/winner.png';
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import githubIcon from '../../assets/IMG-ProfilePage/github.png';
import oneIcon from '../../assets/IMG-RankingPage/1stplace.png';
import twoIcon from '../../assets/IMG-RankingPage/2ndplace.png';
import threeIcon from '../../assets/IMG-RankingPage/3rdplace.png';
import Header2 from '../../components/Header2/Header2';

const RankingPage = () => {
  const users = [
    { name: "Eduardo Oliveira", score: 361 },
    { name: "Marina Andrade", score: 320 },
    { name: "Guilherme Barbosa", score: 317 },
    { name: "Lucas Silva", score: 310 },
    { name: "Vinicius Tenório", score: 301 },
    { name: "Sergio Gomes", score: 296 },
    { name: "Leonardo Oliveira", score: 280 },
    { name: "Lucas Carvalho", score: 271 },
    { name: "Mariana Ferreira", score: 262 },
    { name: "Bianca Nunes", score: 252 },
    { name: "Iuri Rodrigues", score: 222 },
    { name: "Larissa Nascimento", score: 219 },
    { name: "Beatriz Azevedo", score: 210 },
    { name: "Joao Vasconcelos", score: 204 },
    { name: "Mariana Mourato", score: 200 },
    { name: "Junior Araujo", score: 194 },
    { name: "Paulo Augusto", score: 182 },
    { name: "Marcelo Morgon", score: 170 },
    { name: "Livia Lima", score: 160 },
    { name: "Paulo Cesar", score: 148 },
    { name: "Lara Campos", score: 137 },
    { name: "Guilherme Sabatina", score: 136 },
    { name: "Lucindo Vasconcelos", score: 130 },
    { name: "Diego Souza", score: 8 }
  ];

  
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const topUsers = sortedUsers.slice(3, 10);

  return (
    <div>
      <Header2 />
      <div className="ranking-page">
        <div className="content">


          <div className="top-three">
            <div className="second-card">
              <div className="profile-image">
                <img src={twoIcon} alt="second-place" className="two-image" />
                <img src={profileIcon} alt="Profile" />
              </div>
              <p className="name">Heitor Costa</p>
              <p className="score">382</p>
            </div>
            <div className='winner-icon'>
              <img src={winnerIcon} alt="winner" />
            </div>
            <div className="winner-card">
              <div className="profile-image">
                <img src={oneIcon} alt="1st-place" className="one-image" />
                <img src={profileIcon} alt="Profile" />
              </div>
              <p className="name">Joao Silva</p>
              <p className="score">396</p>
            </div>

            <div className="third-card">
              <div className="profile-image">
                <img src={threeIcon} alt="3rd-place" className="three-image" />
                <img src={profileIcon} alt="Profile" />
              </div>
              <p className="name">Mayara Lima</p>
              <p className="score">378</p>
            </div>
          </div>

          
            <div className="ranking-list2">
              <table>
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>Usuário</th>
                    <th>Github</th>
                    <th>PR's</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user, index) => (
                    <tr key={user.name}>
                      <td className="index">{index + 4}</td>
                      <td className="user-name">
                        <div className="user-info">
                          <img src={profileIcon} alt={`${user.name} profile`} className="user-profile-image" />
                          {user.name}
                        </div>
                      </td>
                      <td>
                        <img src={githubIcon} alt="github" className="github-image" />
                      </td>
                      <td>PR's</td>
                      <td className="score">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          


          {/* Mantendo a lista de classificação abaixo */}
          <div className="ranking-list">
            <table>
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Usuário</th>
                  <th>Github</th>
                  <th>PR's</th>
                  <th>Score</th>
                  
                </tr>
              </thead>
              <tbody>
                {sortedUsers.slice(10).map((user, index) => (
                  <tr key={user.name}>
                    <td className="index">{index + 11}</td>
                    <td className="user-name">
                      <div className="user-info">
                        <img src={profileIcon} alt={`${user.name} profile`} className="user-profile-image" />
                        {user.name}
                      </div>
                    </td>
                    <td>
                      <img src={githubIcon} alt="github" className="github-image" />
                    </td>
                    <td>PR's</td>
                    <td className="score">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        
      </div>
    </div>
  );
};

export default RankingPage;
