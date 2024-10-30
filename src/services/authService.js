import { auth, db } from '../firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';

// Login com GitHub e captura do token
export const githubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        const githubUsername = await getGithubUsername(token); // Obtenha o username usando a API do GitHub

        return { success: true, token, username: githubUsername, userId: user.uid };
    } catch (error) {
        console.error('Erro no login com GitHub:', error);
        return { success: false, error: 'Erro no login com GitHub. Por favor, tente novamente mais tarde.' };
    }
};

// Função para obter o username do GitHub
const getGithubUsername = async (token) => {
    const response = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `token ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar username do GitHub');
    }

    const data = await response.json();
    return data.login; // Retorna o username
};

// Verificar disponibilidade do nome
export const checkNameAvailability = async (name) => {
    const nameQuery = query(collection(db, 'users'), where('name', '==', name));
    const nameQuerySnapshot = await getDocs(nameQuery);
    return nameQuerySnapshot.empty;
};

// Registrar novo usuário
export const registerUser = async (name, password, githubUsername) => {
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
        githubUsername,
    });
};
