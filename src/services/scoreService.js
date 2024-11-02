import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para adicionar pontos ao usuário
export const addPoints = async (userId, points) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const currentScore = userDoc.data().score || 0;
    await updateDoc(userRef, { score: currentScore + points });
    console.log(`Pontos atualizados para o usuário com ID ${userId}: ${currentScore + points}`); // Log para depuração
  } else {
    console.error(`Usuário com ID ${userId} não encontrado`); // Log para depuração
  }
};

// Funções para atualizar o score com base nos eventos do GitHub
