import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase'
import { updateRanking } from './rankingService';

// Função para adicionar pontos ao usuário
export const addPoints = async (userId, points) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const currentScore = userDoc.data().score || 0;
    const newScore = currentScore + points;
    await updateDoc(userRef, { score: newScore });
    console.log(`Pontos atualizados para o usuário com ID ${userId}: ${newScore}`);
    
    await updateRanking(); // Atualiza o ranking global
    return newScore;
  } else {
    console.error(`Usuário com ID ${userId} não encontrado`);
    return 0;
  }
};