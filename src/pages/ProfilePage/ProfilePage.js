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
import { updateRanking } from '../../services/rankingService'; // Importa a função de atualização de ranking

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

  const fetchUserProfile = async (userId) => { // Recebe o userId como parâmetro
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
      setScore(userData.score || 0);
      setRanking(userData.ranking || 0);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`Usuário logado: ${user.uid}`);
        setUserId(user.uid);
        fetchUserProfile(user.uid);
        updateRanking(user.uid);
      } else {
        console.log('Nenhum usuário logado');
      }
    });
  
    return () => unsubscribe();
  }, []);

  if (!userId) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento enquanto o UID não é obtido
  }

  // Função para determinar o título da classe com base no ranking
  const getUserClass = (ranking) => {
    if (ranking >= 500) {
      return "Resolutivo Supremo"
    }
    if (ranking >= 350) {
      return "Arquiteto da Resolução"
    }
    if (ranking >= 200) {
      return "Guru do Debugging";
    } else if (ranking >= 100) {
      return "Veterano da Codificação";
    } else if (ranking >= 50) {
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
                        <p className="contribution-user">arthurlima05</p>
                      </div>
                    </div>
                    <span className="contribution-status" style={{ color: getStatusColor('Aberta') }}>
                      Aberta
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
