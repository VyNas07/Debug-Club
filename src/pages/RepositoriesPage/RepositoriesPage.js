import React from 'react';
import Header2 from '../../components/Header2/Header2';
import '../RepositoriesPage/RepositoriesPage.css';
import GithubIcon from '../../assets/IMG-ProfilePage/github.png';

const repositories = [
  { title: 'Erro de "403 Forbidden" ao acessar áreas restritas', user: 'arthurlima05', status: 'Aberta', date: '24/03/2024' },
  { title: 'Implementar autenticação de dois fatores', user: 'Gabrielperguntador', status: 'Aberta', date: '08/12/2024' },
  { title: 'Incluir uma opção para exportar dados em CSV', user: 'Joabiogama36', status: 'Aberta', date: '10/09/2024' },
  { title: 'LangChain AI', user: 'VyktorGamer07', status: 'Aberta', date: '05/03/2024' },
  { title: 'Hackear a NASA', user: 'Arthurzinho', status: 'Fechada', date: '30/04/2024' },
  { title: 'Criação de casa de aposta', user: 'UrubudoPIX', status: 'Fechada', date: '05/03/2024' },
  { title: 'Tigrinho´s game', user: 'Oreida.com', status: 'Aberta', date: '05/03/2024' },
];

function RepositoriesPages() {
  return (
    <div className="main-container">
      <Header2 />
      <main className="main-content">
        <h1>Repositórios recomendados</h1>
        <div className="repo">
        <ul className="repository-list">
          {repositories.map((repo, index) => (
            <li key={index} className="repository-item">
              <div className="repo-info">
                <img src={GithubIcon} className="repo-icon"/>
                <div className="repo-detail">
                <span className="repo-title">{repo.title}</span>
                <span className="repo-user">{repo.user}</span>
                </div>
              </div>
              <div className="repo-status">
                <span
                  className="status"
                  style={{ color: repo.status === 'Aberta' ? 'green' : 'red' }}
                >
                  {repo.status}
                </span>
                <span className="date">{repo.date}</span>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </main>
    </div>
  );
}

export default RepositoriesPages;
