import React from 'react';
import Header2 from '../../components/Header2/Header2';
import '../RepositoriesPage/RepositoriesPage.css';
import GithubIcon from '../../assets/IMG-ProfilePage/github.png';
import Rodape from '../../components/Footer/Footer';

const repositories = [
  { title: 'Problemas encontrados no WSL', user: 'Microsoft', status: 'Aberta', date: '06/04/2016', url: 'https://github.com/microsoft/WSL' },
  { title: 'Abra novos problemas em nosso rastreador de problemas no GitLab.com', user: 'gitlabhq', status: 'Aberta', date: '07/06/2018', url: 'https://github.com/gitlabhq/gitlabhq'},
  { title: 'Ferramenta para corrigir automaticamente problemas de padrões de ajuste PHP', user: 'PHP-CS-Fixador', status: 'Aberta', date: '28/05/2015', url: 'https://github.com/PHP-CS-Fixer/PHP-CS-Fixer' },
  { title: 'Agregador para problemas registrados contra o kubeadm', user: 'kubernetes', status: 'Aberta', date: '22/09/2016', url: 'https://github.com/kubernetes/kubeadm' },
  { title: 'Problemas comuns durante o desenvolvimento com o Expo', user: 'Rocketseat', status: 'Aberta', date: '03/09/2019', url: 'https://github.com/Rocketseat/expo-common-issues' },
  { title: 'Site de blog pessoal baseado em problemas do GitHub', user: 'varHarrie', status: 'Aberta', date: '07/04/2022', url: 'https://github.com/varHarrie/varharrie.github.io' },
  { title: 'Faça sua primeira contribuição de código aberto.', user: 'DeepSourceCorp', status: 'Aberta', date: '30/01/2020', url: 'https://github.com/DeepSourceCorp/good-first-issue' },
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
                  <img src={GithubIcon} className="repo-icon" alt="GitHub Icon" />
                  <div className="repo-detail">
                    {/* Adicionando o link ao título */}
                    {repo.url ? (
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="repo-title">
                        {repo.title}
                      </a>
                    ) : (
                      <span className="repo-title">{repo.title}</span>
                    )}
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
      <div className='footer'>
      <Rodape />
      </div>
      
    </div>
  );
}

export default RepositoriesPages;
