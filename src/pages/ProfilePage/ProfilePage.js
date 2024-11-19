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

  return (
    <div>
      <Header2 /> {Header}
      <div className="container">
        <div className="profile-card">
          <Link to='/profileedit'>
            <button className="edit-button">
              <img src={iconeEdit} alt="botão editar" />
            </button>
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
        <main className="main">
          <div className="ranking-contribution-container">
            <div className="ranking-section">
              <div className="ranking-card">
                <h3>Ranking Atual:</h3>
                <span className="ranking-value">{ranking}</span> {/* Renderiza o ranking do usuário */}
              </div>
              <div className="ranking-card">
                <h3>Pontuação:</h3>
                <span className="ranking-value">{score}</span>
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
      <Rodape />
    </div>
  );
};

export default ProfilePage;
