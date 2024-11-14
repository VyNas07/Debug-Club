import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

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
export const saveDataToFirestore = async (collectionName, data, userId, db) => {
  try {
    const id = data.sha || data.id; // Use `sha` ou `id` como identificador
    if (!data || !id) {
      console.error('Dados ou ID não definidos:', data);
      return;
    }

    // Caminho para subcoleção específica do usuário
    const docRef = doc(db, 'users', userId, collectionName, id.toString());

    await setDoc(docRef, data);
    console.log(`${collectionName} salvo como subcoleção no Firestore:`, id);
  } catch (error) {
    console.error(`Erro ao salvar ${collectionName} como subcoleção no Firestore:`, error);
  }
};


// Função para buscar os repositórios de um usuário do GitHub
export const fetchRepos = async (username, token) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.data;  // Retorna a lista de repositórios
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    throw error;  // Lança o erro para que você possa tratá-lo no lugar onde chamou a função
  }
};
