import { doc, getDoc, updateDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Função para recalcular e atualizar o ranking do usuário
export const updateRanking = async (userId) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('score', 'desc'));
  const querySnapshot = await getDocs(q);

  let ranking = 1;
  querySnapshot.forEach((doc) => {
    if (doc.id === userId) {
      updateDoc(doc.ref, { ranking: ranking });
      console.log(`Ranking atualizado para o usuário com ID ${userId}: ${ranking}`); // Log para depuração
    }
    ranking++;
  });
};