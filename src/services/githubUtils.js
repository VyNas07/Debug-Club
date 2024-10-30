import { doc, setDoc } from 'firebase/firestore';

export const fetchIssues = async (username, token) => {
  try {
    console.log('GitHub Token:', token);
    const response = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`, {
      headers: {
        Authorization: `token ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar issues: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Resposta da API do GitHub:', data);
    return data.items || [];
  } catch (error) {
    console.error('Erro ao buscar issues do GitHub:', error);
    return [];
  }
};

export const saveIssueToFirestore = async (issue, userId, db) => {
  try {
    await setDoc(doc(db, 'users', userId, 'issues', issue.id.toString()), issue);
    console.log('Issue salva no Firestore:', issue.id);
  } catch (error) {
    console.error('Erro ao salvar issue no Firestore:', error);
  }
};
