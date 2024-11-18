import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Obtém a instância do Firestore
const db = getFirestore();

// Função para contar documentos em uma coleção
const countCollectionDocuments = async (userId, collectionName) => {
  try {
    if (!userId || !collectionName) {
      throw new Error('userId ou collectionName está indefinido');
    }
    
    console.log('userId:', userId);
    console.log('collectionName:', collectionName);

    const collectionRef = collection(db, 'users', userId, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    // Retorna o número de documentos
    return querySnapshot.size;
  } catch (error) {
    console.error('Erro ao contar documentos da coleção:', error.message);
    return 0;
  }
};

export const getUserContributionCounts = async (userId) => {
  try {
    if (!userId) {
      throw new Error('userId está indefinido');
    }

    // Contando documentos em cada coleção
    const totalIssues = await countCollectionDocuments(userId, 'issues');
    const totalCommits = await countCollectionDocuments(userId, 'commits');
    const totalPullRequests = await countCollectionDocuments(userId, 'pullRequests');
    const totalForks = await countCollectionDocuments(userId, 'forks');

    // Exibindo as contagens
    console.log('Total de Issues:', totalIssues);
    console.log('Total de Commits:', totalCommits);
    console.log('Total de Pull Requests:', totalPullRequests);
    console.log('Total de Forks:', totalForks);

    // Retornando os totais
    return { totalIssues, totalCommits, totalPullRequests, totalForks };
  } catch (error) {
    console.error('Erro ao obter contribuições do usuário:', error.message);
    return { totalIssues: 0, totalCommits: 0, totalPullRequests: 0, totalForks: 0 };
  }
};
