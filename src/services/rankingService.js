import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para recalcular e atualizar o ranking dos desenvolvedores
export const updateRanking = async () => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('score', 'desc'));
  const querySnapshot = await getDocs(q);

  let ranking = 1;
  querySnapshot.forEach((userDoc) => {
    const userRef = doc(db, 'users', userDoc.id);
    updateDoc(userRef, { ranking: ranking });
    ranking++;
  });
};