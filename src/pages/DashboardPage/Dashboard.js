import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header2 from '../../components/Header2/Header2';
import ProfileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import ContributionChart from '../../components/ContributionChart/ContributionChart';
import ContributionReviewChart from '../../components/ContributionReviewChart/ContributionReviewChart';
import { getUserContributionCounts } from '../../components/countCollectionDocuments';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Dashboard({ userId }) {
  const [githubData, setGithubData] = useState({
    issues: 0,
    commits: 0,
    pullRequests: 0,
    forks: 0,
  });
  const [profile, setProfile] = useState({
    name: '',
    profession: '',
  });
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (userId) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfile({
          name: userData.name || "Usuário Anônimo",
          profession: userData.profession || "Profissão não informada",
          profilePicture: userData.profilePicture || ProfileIcon
        });
        setScore(userData.score || 0); // Atualiza a pontuação do usuário
      } else {
        console.log('Perfil não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar perfil: ', error);
    }
  };

  // Função para determinar o título do usuário com base na pontuação
  const getUserClass = (score) => {
    if (score >= 500) return "Resolutivo Supremo";
    if (score >= 350) return "Arquiteto da Resolução";
    if (score >= 200) return "Guru do Debugging";
    if (score >= 100) return "Veterano da Codificação";
    if (score >= 50) return "Desbravador de Problemas";
    return "Explorador de Bugs";
  };

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!userId) {
        setError('User ID is required');
        setLoading(false);
        return;
      }

      try {
        await fetchUserProfile(userId);
        const data = await getUserContributionCounts(userId);
        setGithubData(data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [userId]);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="header-content">
      <Header2 />
      <div className="container-general">
        <div className="container-separate">
          <div className="profile">
          <img src={profile.profilePicture} alt="Profile" />
            <h2 className = "name">{profile.name}</h2>
            <p className="role">{getUserClass(score)}</p>
          </div>

          <div className="reviews">
            <h3>Contribuições:</h3>
            <ContributionReviewChart userId={userId} />
          </div>
        </div>

        <div className="second-container-separate">
          <div className="progress">
            <h3>Próximo Título:</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '80%' }}></div>
            </div>
            <p>{getUserClass(score)}</p>
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
              <ContributionChart
                issues={githubData.issues}
                commits={githubData.commits}
                pullRequests={githubData.pullRequests}
                forks={githubData.forks}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;