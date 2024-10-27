import { fetchIssues, saveIssueToFirestore } from './githubUtils';

export const integrateGithubIssues = async (username, userId, token) => {
  try {
    const issues = await fetchIssues(username, token);
    if (!issues || issues.length === 0) {
      console.log('Nenhuma issue encontrada para o usuário:', username);
    } else {
      issues.forEach(async issue => {
        await saveIssueToFirestore(issue, userId);
      });
      console.log('Issues integradas com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao integrar issues do GitHub:', error);
  }
};
