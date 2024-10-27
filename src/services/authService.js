// src/services/authService.js
import { auth, db } from '../../firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';

export const githubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        return { success: true };
    } catch (error) {
        console.error('Erro no login com GitHub:', error);
        return { success: false, error: 'Erro no login com GitHub. Por favor, tente novamente mais tarde.' };
    }
};

export const checkNameAvailability = async (name) => {
    const nameQuery = query(collection(db, 'users'), where('name', '==', name));
    const nameQuerySnapshot = await getDocs(nameQuery);
    return nameQuerySnapshot.empty;
};

export const registerUser = async (name, password) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Conexão com o GitHub não encontrada. Por favor, tente autenticar-se novamente.');
    }

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
        throw new Error('Você já possui uma conta com este GitHub.');
    }

    await setDoc(doc(db, 'users', user.uid), {
        name,
        password,
        github: user.providerData[0].displayName,
    });
};
