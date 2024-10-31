import { getFirestore } from 'firebase/firestore';
import { fetchIssues, saveDataToFirestore, fetchCommits, fetchPullRequests, fetchForks } from './githubUtils';

// Obtém o token do GitHub da variável de ambiente
const token = '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';

const db = getFirestore();

export const integrateGithubData = async (username, userId) => {
  try {
    console.log('Iniciando integração de dados do GitHub para o usuário:', username);

    // 1. Buscar e salvar issues
    const issues = await fetchIssues(username, token);
    if (issues && issues.length > 0) {
      for (const issue of issues) {
        console.log('Salvando issue:', issue); // Adicionado log aqui
        await saveDataToFirestore('issues', issue, userId, db);
        console.log('Issue salva:', issue.id);
      }
    } else {
      console.log('Nenhuma issue encontrada para o usuário:', username);
    }

    // 2. Buscar e salvar commits
    const repos = await fetchRepos(username, token);
    for (const repo of repos) {
      const commits = await fetchCommits(username, repo.name, token);
      if (commits && commits.length > 0) {
        for (const commit of commits) {
          console.log('Salvando commit:', commit); // Adicionado log aqui
          await saveDataToFirestore('commits', commit, userId, db);
          console.log('Commit salvo:', commit.sha);
        }
      } else {
        console.log('Nenhum commit encontrado para o repositório:', repo.name);
      }
    }

    // 3. Buscar e salvar pull requests
    for (const repo of repos) {
      const pullRequests = await fetchPullRequests(username, repo.name, token);
      if (pullRequests && pullRequests.length > 0) {
        for (const pr of pullRequests) {
          console.log('Salvando pull request:', pr); // Adicionado log aqui
          await saveDataToFirestore('pullRequests', pr, userId, db);
          console.log('Pull request salva:', pr.id);
        }
      } else {
        console.log('Nenhum pull request encontrado para o repositório:', repo.name);
      }
    }

    // 4. Buscar e salvar forks
    const forks = await fetchForks(username, token);
    if (forks && forks.length > 0) {
      for (const fork of forks) {
        console.log('Salvando fork:', fork); // Adicionado log aqui
        await saveDataToFirestore('forks', fork, userId, db);
        console.log('Fork salvo:', fork.id);
      }
    } else {
      console.log('Nenhum fork encontrado para o usuário:', username);
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
        Authorization: `token ${token}`
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
