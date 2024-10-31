import { doc, setDoc } from 'firebase/firestore';

// Função para buscar issues do usuário
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

// Função para buscar commits do usuário
export const fetchCommits = async (username, repo, token) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`, {
      headers: {
        Authorization: `token ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar commits: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Commits retornados:', data);
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar commits do GitHub:', error);
    return [];
  }
};

// Função para buscar pull requests do usuário
export const fetchPullRequests = async (username, repo, token) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/pulls?state=all`, {
      headers: {
        Authorization: `token ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar pull requests: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Pull requests retornados:', data);
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar pull requests do GitHub:', error);
    return [];
  }
};

// Função para buscar repositórios forkados do usuário
export const fetchForks = async (username, token) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar forks: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const forkedRepos = data.filter(repo => repo.fork);
    console.log('Repositórios forkados:', forkedRepos);
    return forkedRepos || [];
  } catch (error) {
    console.error('Erro ao buscar forks do GitHub:', error);
    return [];
  }
};

// Função para salvar dados no Firestore
export const saveDataToFirestore = async (collection, data, userId, db) => {
  try {
    // Logando os dados recebidos
    console.log('Dados recebidos para salvar:', data);

    // Para commits, use o sha como id
    const id = data.sha || data.id;

    // Verifique se data e id estão definidos
    if (!data || !id) {
      console.error('Dados ou ID não definidos:', data);
      return; // Não prosseguir se os dados não forem válidos
    }

    await setDoc(doc(db, 'users', userId, collection, id.toString()), data);
    console.log(`${collection} salvo no Firestore:`, id);
  } catch (error) {
    console.error(`Erro ao salvar ${collection} no Firestore:`, error);
  }
};

