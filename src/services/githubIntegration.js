import { getFirestore } from 'firebase/firestore';
import { fetchIssues, saveIssueToFirestore } from './githubUtils';

// Obtém o token do GitHub da variável de ambiente
const token = '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';


const db = getFirestore();

export const integrateGithubIssues = async (username, userId) => {
  try {
    console.log('Iniciando integração das issues para o usuário:', username);
    const issues = await fetchIssues(username, token);
    console.log('Issues retornadas:', issues);

    if (!issues || issues.length === 0) {
      console.log('Nenhuma issue encontrada para o usuário:', username);
    } else {
      for (const issue of issues) {
        await saveIssueToFirestore(issue, userId, db);
        console.log('Issue salva:', issue.id);
      }
      console.log('Issues integradas com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao integrar issues do GitHub:', error);
  }
};
