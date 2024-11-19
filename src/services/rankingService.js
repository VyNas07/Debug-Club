import { collection, query, orderBy, getDocs, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

// Função para recalcular e atualizar o ranking dos desenvolvedores
export const updateRanking = async () => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('score', 'desc'));
  const querySnapshot = await getDocs(q);

  let ranking = 1;
  const batch = writeBatch(db); // Usar batch para garantir atomicidade

  querySnapshot.forEach((userDoc) => {
    const userRef = doc(db, 'users', userDoc.id);
    batch.update(userRef, { ranking: ranking });
    ranking++;
  });

  await batch.commit(); // Commit das atualizações em batch
};