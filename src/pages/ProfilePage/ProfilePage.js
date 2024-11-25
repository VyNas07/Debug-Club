import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import profileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import iconeEdit from '../../assets/IMG-ProfilePage/iconeeditar.png';
import iconeGithub from '../../assets/IMG-ProfilePage/github.png';
import Header from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';
import Header2 from '../../components/Header2/Header2';
import { Link } from "react-router-dom";
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';// Importa a função de atualização de ranking
import ContributionReviewChart from '../../components/ContributionReviewChart/ContributionReviewChart';
import ContributionChart from '../../components/ContributionChart/ContributionChart';
import infoIcon from '../../assets/IMG-Gerais/informacoes.png';


const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    bio: "",
    profilePicture: ""
  });
  const [score, setScore] = useState(0); // Estado para armazenar a pontuação do usuário
  const [ranking, setRanking] = useState(0); // Estado para armazenar o ranking do usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const [showInfoRanking, setShowInfoRanking] = useState(false);
  
  const fetchUserProfile = async (userId) => {
    if (!userId) {
      console.log("Erro: userId é nulo ou indefinido.");
      return;
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfile({
          name: userData.name || "",
          profession: userData.profession || "",
          bio: userData.bio || "",
          profilePicture: userData.profilePicture || profileIcon
        });
        setScore(userData.score || 0); // Define a pontuação do usuário
        setRanking(userData.ranking || 0); // Define o ranking do usuário
      } else {
        console.log('Perfil não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar perfil: ', error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Estado de autenticação mudou: ', user);
      if (user) {
        console.log(`Usuário logado: ${user.uid}`);
        setUserId(user.uid);  // Atualizando o userId com o uid do usuário
      } else {
        console.log('Nenhum usuário logado');
        setUserId(null); // Garantir que userId seja null quando o usuário não estiver logado
      }
    });

    return () => unsubscribe();
  }, []); // Hook executado apenas uma vez após o componente ser montado

  // Espera até o userId estar disponível
  useEffect(() => {
    if (userId) {
      setLoading(true); // Inicia o carregamento
      fetchUserProfile(userId)
        .finally(() => {
          setLoading(false); // Define 'loading' como false após o carregamento
        });
    }
  }, [userId]); // Executa quando userId mudar

  // Exibe "Carregando" enquanto os dados estão sendo carregados
  if (loading) {
    return <LoadingScreen />;
  }

  // Verifica se o usuário não está logado
  if (!userId) {
    return <p>Você precisa estar logado para acessar o perfil.</p>;
  }


  // Função para determinar o título da classe com base no ranking
  const getUserClass = (score) => {
    if (score >= 500) {
      return "Resolutivo Supremo"
    }
    else if (score >= 350) {
      return "Arquiteto da Resolução"
    }
    else if (score >= 200) {
      return "Guru do Debugging";
    } else if (score >= 100) {
      return "Veterano da Codificação";
    } else if (score >= 50) {
      return "Desbravador de Problemas";
    } else {
      return "Explorador de Bugs";
    }
  };

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

  const getNextUserClass = (score) => {
    if (score < 75) return "Desbravador de Problemas";
    if (score < 175) return "Veterano da Codificação";
    if (score < 350) return "Guru do Debugging";
    if (score < 600) return "Arquiteto da Resolução";
    if (score < 1000) return "Resolutivo Supremo";
    return "Debug Insane"
  };
  

  const getProgressToNextTitle = (score) => {
    if (score < 75) return (score / 75) * 100; // Progressão para "Veterano da Codificação"
    if (score < 175) return ((score - 75) / 100) * 100; // Progressão para "Guru do Debugging"
    if (score < 350) return ((score - 175) / 175) * 100; // Progressão para "Arquiteto da Resolução"
    if (score < 600) return ((score - 350) / 250) * 100; // Progressão para "Resolutivo Supremo"
    if (score < 1000) return ((score - 600) / 400) * 100; // Progressão para "Debug Insane"
    return 100; // Para quem já tem o título de "Debug Insane"
  };

const getProgressBarColor = (score) => {
  return score >= 1000 ? '#FFD700' : '#4A90E2'; // Dourado para 1000 ou mais, verde para menos de 1000
};
  

  return (
    <div>
      <Header2 /> {Header}
      <div className="container">
        <div className="container-division">
          <div className="profile-card">
            <Link to='/profileedit'>
              <div className="img-separated">
                <button className="edit-button">
                  <img src={iconeEdit} alt="botão editar" className='icon-edit' />
                </button>
              </div>
            </Link>
            <div className="profile-img">
              <img src={profile.profilePicture} alt="Profile" />
            </div>
            <div className="profile-info">
              <h1 className='perfilname'>{profile.name}</h1>
              <p className='profession'>
                {profile.profession ? profile.profession : "Profissão não informada"}</p>
              <h3 className="classe">{getUserClass(score)}</h3> {/* Classe dinâmica */}
              <p className={profile.bio ? 'bio' : 'bio centered-bio'}>
                {profile.bio ? profile.bio : "*Nenhuma Biografia Registrada*"}
              </p>
            </div>
          </div>
          <div className="reviews">
            <h3>Contribuições:</h3>
            <ContributionReviewChart userId={userId} />
          </div>
        </div>

        <main className="main">
          <div className="progress">
            <h3>Próximo Título:</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${getProgressToNextTitle(score)}%`,
                  backgroundColor: getProgressBarColor(score), // Aplica a cor da barra
                }}
              ></div>
            </div>
            <p>{getNextUserClass(score)}</p>
          </div>
          <div className="ranking-contribution-container">
            <div className="ranking-section-profile">
              <div className="ranking-card">
                <div className="info-separation">
                <h3>Ranking Atual:</h3>
                <button className="info-button" onClick={() => setShowInfoRanking(!showInfoRanking)}>
                  <img src={infoIcon} className="info-icon2"/>
                </button>
                {showInfoRanking && (
                        <div className="info-message2"><p>
                        Forks Inseridos: 2pts
                        <br></br>
                        Commits em Repositórios: 3pts
                        <br></br>
                        Issues Criadas: 5pts
                        <br></br>
                        Pull Requests: 10Pts</p>
                        </div>
                      )}
                </div>
                <span className="ranking-value">{ranking}</span>

              </div>
              <div className="ranking-card">
                <h3>Pontuação:</h3>
                <span className="ranking-value">{score}</span>
              </div>
            </div>
            <div className="contribution-section">
            <div className="contributions-historico">
            <div className="chart">
              <h3>Histórico de Contribuições:</h3>
              <ContributionChart userId={userId} />
            </div>
          </div>
          </div>
            
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
                        <p className="contribution-user">ana.santos</p>
                      </div>
                    </div>
                    <span className="contribution-status" style={{ color: getStatusColor('Fechada') }}>
                      Fechada
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div className='footer'>
      <Rodape />
      </div>
      
    </div>
  );
};

export default ProfilePage;
