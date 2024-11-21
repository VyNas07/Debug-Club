import React, { useState, useEffect } from 'react';
import './RankingPage.css';
import winnerIcon from '../../assets/IMG-RankingPage/winner.png';
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import githubIcon from '../../assets/IMG-ProfilePage/github.png';
import oneIcon from '../../assets/IMG-RankingPage/1stplace.png';
import twoIcon from '../../assets/IMG-RankingPage/2ndplace.png';
import threeIcon from '../../assets/IMG-RankingPage/3rdplace.png';
import Header2 from '../../components/Header2/Header2';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Rodape from '../../components/Footer/Footer';
import InfoIcon from '../../assets/IMG-Gerais/informacoes.png';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom'; // Importar Link para criar os links

const RankingPage = () => {
  const [topThree, setTopThree] = useState([]);
  const [topUsers, setTopUsers] = useState([]); 
  const [loading, setLoading] = useState(true); // Estado para controle do carregamento
  const [sortedUsers, setSortedUsers] = useState([]); 
  const [showInfoTop, setShowInfoTop] = useState(false); // Estado para controlar a visibilidade na tabela top 3
  const [showInfoRest, setShowInfoRest] = useState(false); // Estado para controlar a visibilidade na tabela restante

  const fetchRanking = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('score', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);
  
    const rankingData = [];
  
    for (const doc of querySnapshot.docs) {
      const userData = { id: doc.id, ...doc.data() };
  
      const githubUsername = userData.githubUsername || 'default-username';
      
      // Requisições paralelas para obter commits, PRs, forks e issues
      const [commitsSnapshot, prSnapshot, forksSnapshot, issuesSnapshot] = await Promise.all([ 
        getDocs(collection(db, 'users', doc.id, 'commits')),
        getDocs(collection(db, 'users', doc.id, 'pullRequests')),
        getDocs(collection(db, 'users', doc.id, 'forks')),
        getDocs(collection(db, 'users', doc.id, 'issues')),
      ]);
  
      const totalActivities = commitsSnapshot.size + prSnapshot.size + forksSnapshot.size + issuesSnapshot.size;
      userData.totalActivities = totalActivities;
      userData.githubUsername = githubUsername;
  
      rankingData.push(userData);
    }
  
    setTopThree(rankingData.slice(0, 3));
    setTopUsers(rankingData.slice(3, 10)); 
    setSortedUsers(rankingData.slice(10, 20));
    setLoading(false); // Defina o carregamento como falso quando os dados forem carregados
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  if (loading) {
    return <LoadingScreen />; // Exibe a tela de carregamento enquanto os dados estão sendo carregados
  }

  return (
    <div>
      <Header2 />
      <div className="ranking-page">
        <div className="content">
          <div className="top-three">
            {topThree.map((user, index) => (
              <div key={user.id} className={`top-user top-user-${index + 1}`}>
                <div className="profile-container">
                  <div className="profile-image">
                    <div className="top-three-github">
                    <button
                      className="top-button-github"
                      onClick={() => window.open(`https://github.com/${user.githubUsername}`, "_blank")}
                    >
                      <img src={githubIcon} alt="GitHub Icon" />
                    </button>
                    </div>
                    <img
                      src={index === 0 ? oneIcon : index === 1 ? twoIcon : threeIcon}
                      alt={`${index + 1}st-place`}
                      className={`${index === 0 ? 'one-image' : index === 1 ? 'two-image' : 'three-image'}`}
                    />
                    <img src={user.profilePicture || profileIcon} alt="Profile" />
                  </div>
                </div>
                <p className="name">
                  <Link to={`/dashboard/${user.id}`} className='user-name-color'>{user.name}</Link>
                </p>
                <p className="score">{user.score}</p>
              </div>
            ))}
            <div className="winner-icon">
              <img src={winnerIcon} alt="winner" />
            </div>
          </div>

          <div className="ranking-list2">
            <table>
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Usuário</th>
                  <th>Github</th>
                  <th> 
                    <div className="info-container">
                      <p>QA</p>
                      <button 
                        className="info-button"
                        onClick={() => setShowInfoTop(!showInfoTop)} // Alternar a visibilidade da tabela 1
                      >
                        <img src={InfoIcon} alt="Info Icon" className="info-icon" />
                      </button>
                      {showInfoTop && (
                        <div className="info-message"><p>Quantidade de Atividades(Commits + PR's + Forks + Issues Criadas)</p></div>
                      )}
                    </div>
                  </th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="index">{index + 4}</td>
                    <td className="user-name">
                      <div className="user-info">
                        <img
                          src={user.profilePicture || profileIcon}
                          alt={`${user.name} profile`}
                          className="user-profile-image"
                        />
                        <Link to={`/dashboard/${user.id}`} className='user-name-color'>{user.name}</Link>
                      </div>
                    </td>
                    <td>
                    <button
                      className="top-button-githubList"
                      onClick={() => window.open(`https://github.com/${user.githubUsername}`, "_blank")}
                    >
                      <img src={githubIcon} alt="GitHub Icon" />
                    </button>
                    </td>
                    <td>{user.totalActivities}</td>
                    <td className="score">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ranking-list3">
          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Usuário</th>
                <th>Github</th>
                <th> 
                  <div className="info-container">
                    <p>QA</p>
                    <button 
                      className="info-button"
                      onClick={() => setShowInfoRest(!showInfoRest)} // Alternar a visibilidade da tabela 2
                    >
                      <img src={InfoIcon} alt="Info Icon" className="info-icon" />
                    </button>
                    {showInfoRest && (
                      <div className="info-message"><p>Quantidade de Atividades(Commits + PR's + Forks + Issues Criadas)</p></div>
                    )}
                  </div>
                </th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="index">{index + 11}</td>
                  <td className="user-name">
                    <div className="user-info">
                      <img
                        src={user.profilePicture || profileIcon}
                        alt={`${user.name} profile`}
                        className="user-profile-image"
                      />
                      <Link to={`/dashboard/${user.id}`}>{user.name}</Link>
                    </div>
                  </td>
                  <td>
                    <button
                      className="top-button-githubList"
                      onClick={() => window.open(`https://github.com/${user.githubUsername}`, "_blank")}
                    >
                      <img src={githubIcon} alt="GitHub Icon" />
                    </button>
                  </td>
                  <td>{user.totalActivities}</td>
                  <td className="score">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Rodape />
    </div>
  );
};

export default RankingPage;
