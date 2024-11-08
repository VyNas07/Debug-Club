import React, { useEffect, useState } from 'react';
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


const RankingPage = () => {
  const [topThree, setTopThree] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);

  const fetchRanking = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('score', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);

    const rankingData = [];
    querySnapshot.forEach((doc) => {
      rankingData.push({ id: doc.id, ...doc.data() });
    });

    setTopThree(rankingData.slice(0, 3));
    setTopUsers(rankingData.slice(3, 10));
    setSortedUsers(rankingData.slice(10, 20));
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <div>
      <Header2 />
      <div className="ranking-page">
        <div className="content">

          <div className="top-three">
            {topThree.map((user, index) => (
              <div key={user.id} className={`top-user top-user-${index + 1}`}>
                <div className="profile-image">
                  <img src={index === 0 ? oneIcon : index === 1 ? twoIcon : threeIcon} alt={`${index + 1}st-place`} className={`${index === 0 ? 'one-image' : index === 1 ? 'two-image' : 'three-image'}`} />
                  <img src={user.profilePicture || profileIcon} alt="Profile" />
                </div>
                <p className="name">{user.name}</p>
                <p className="score">{user.score}</p>
              </div>
            ))}
            <div className='winner-icon'>
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
                  <th>PR's</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="index">{index + 4}</td> {/* Posição do usuário no ranking */}
                    <td className="user-name">
                      <div className="user-info">
                        <img src={user.profilePicture || profileIcon} alt={`${user.name} profile`} className="user-profile-image" /> {/* Renderiza a imagem de perfil */}
                        {user.name} {/* Nome do usuário */}
                      </div>
                    </td>
                    <td>
                      <img src={githubIcon} alt="github" className="github-image" /> {/* Renderiza o ícone do GitHub */}
                    </td>
                    <td>PR's</td> {/* Placeholder para o número de PR's */}
                    <td className="score">{user.score}</td> {/* Pontuação do usuário */}
                  </tr>
                ))}
                {sortedUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="index">{index + 11}</td> {/* Posição do usuário no ranking */}
                    <td className="user-name">
                      <div className="user-info">
                        <img src={user.profilePicture || profileIcon} alt={`${user.name} profile`} className="user-profile-image" /> {/* Renderiza a imagem de perfil */}
                        {user.name} {/* Nome do usuário */}
                      </div>
                    </td>
                    <td>
                      <img src={githubIcon} alt="github" className="github-image" /> {/* Renderiza o ícone do GitHub */}
                    </td>
                    <td>PR's</td> {/* Placeholder para o número de PR's */}
                    <td className="score">{user.score}</td> {/* Pontuação do usuário */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Rodape /> {/* Renderiza o componente Footer */}
    </div>
  );
};

export default RankingPage;