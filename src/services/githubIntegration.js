import { getFirestore } from 'firebase/firestore';
import { fetchIssues, saveDataToFirestore, fetchCommits, fetchPullRequests, fetchForks } from './githubUtils';
import { addPoints } from './scoreService';

// Obtém o token do GitHub da variável de ambiente
const token = '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';

const db = getFirestore();
// Integrar dados do GitHub para o usuário
export const integrateGithubData = async (username, userId) => {
  try {
    console.log('Iniciando integração de dados do GitHub para o usuário:', username);

    // 1. Buscar e salvar issues
    const issues = await fetchIssues(username, token);
    for (const issue of issues) {
      await saveDataToFirestore('issues', issue, userId, db);
      await addPoints(userId, 5); // Adicionar pontos
    }

    // 2. Buscar e salvar commits
    const repos = await fetchRepos(username, token);
    for (const repo of repos) {
      const commits = await fetchCommits(username, repo.name, token);
      for (const commit of commits) {
        await saveDataToFirestore('commits', commit, userId, db);
        await addPoints(userId, 3);
      }
    }

    // 3. Buscar e salvar pull requests
    for (const repo of repos) {
      const pullRequests = await fetchPullRequests(username, repo.name, token);
      for (const pr of pullRequests) {
        await saveDataToFirestore('pullRequests', pr, userId, db);
        await addPoints(userId, 10);
      }
    }

    // 4. Buscar e salvar forks
    const forks = await fetchForks(username, token);
    for (const fork of forks) {
      await saveDataToFirestore('forks', fork, userId, db);
      await addPoints(userId, 2);
    }

    console.log('Integração de dados do GitHub concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao integrar dados do GitHub:', error);
  }
};


// Função para buscar repositórios do usuário
const fetchRepos = async (username, token) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar repositórios: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar repositórios do GitHub:', error);
    return [];
  }
};
