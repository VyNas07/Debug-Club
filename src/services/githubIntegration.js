import { fetchIssues, fetchCommits, fetchPullRequests, fetchForks, fetchRepos } from './githubUtils';
import { saveDataToFirestore} from './githubUtils'
import { updateUserProfile } from './userService';
import { addPoints } from './scoreService';

// Função para integrar e salvar dados do GitHub
export const integrateGithubData = async (username, token, userId, db) => {
  try {
    // Buscar e salvar issues
    const issues = await fetchIssues(username, token);
    for (const issue of issues) {
      await saveDataToFirestore('issues', issue, userId, db);
      await addPoints(userId, 3); // 3 pontos por issue criada
    }

    // Buscar e salvar repositórios, commits, e pull requests
    const repos = await fetchRepos(username, token);
    for (const repo of repos) {
      const commits = await fetchCommits(username, repo.name, token);
      for (const commit of commits) {
        await saveDataToFirestore('commits', commit, userId, db);
        await addPoints(userId, 5); // 5 pontos por commit
      }

      const pullRequests = await fetchPullRequests(username, repo.name, token);
      for (const pr of pullRequests) {
        await saveDataToFirestore('pullRequests', pr, userId, db);
        await addPoints(userId, 10); // 10 pontos por pull request
      }
    }

    // Buscar e salvar forks
    const forks = await fetchForks(username, token);
    for (const fork of forks) {
      await saveDataToFirestore('forks', fork, userId, db);
      await addPoints(userId, 2); // 2 pontos por repositório forkado
    }

    console.log('Dados do GitHub integrados e pontos atribuídos com sucesso!');
  } catch (error) {
    console.error('Erro ao integrar dados do GitHub:', error);
  }
};
