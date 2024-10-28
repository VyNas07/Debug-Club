import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const updateUserProfile = async (userId, profileData) => {
    try {
        const userRef = doc(db, 'users', userId); 
        await setDoc(userRef, profileData, { merge: true }); // Atualiza os dados
        console.log("Perfil atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar perfil: ", error);
    }
};
