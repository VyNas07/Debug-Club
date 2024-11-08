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



const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    bio: "",
    profilePicture: ""
  });
  const [score, setScore] = useState(0); // Estado para armazenar a pontuação do usuário
  const [ranking, setRanking] = useState(0); // Estado para armazenar o ranking do usuário
  const [rankingHistory, setRankingHistory] = useState([]); // Estado para armazenar o histórico de ranking do usuário

  const fetchUserProfile = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
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
      setRankingHistory(userData.rankingHistory || []); // Define o histórico de ranking do usuário

    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Define o UID do usuário logado
        console.log(`Usuário logado com UID: ${user.uid}`); // Log para depuração
        fetchUserProfile(user.uid); // Busca o perfil do usuário logado
        updateRanking(user.uid); // Atualiza o ranking do usuário
      } else {
        console.log('Nenhum usuário logado'); // Log para depuração
      }
    });

    return () => unsubscribe();
    }, []);

    if (!userId) {
      return <p>Carregando...</p>; // Exibe uma mensagem de carregamento enquanto o UID não é obtido
    }
  
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
      <Link to = '/profileedit'>
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
          <h3 className="classe">Explorador de Bugs</h3>
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
      <Rodape/>
    </div>

  );
};

export default Profile;
