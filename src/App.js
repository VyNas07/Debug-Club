import React, { useEffect, useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';

import {initializeApp} from 'firebase/app'
import { collection, getFirestore, getDocs, addDoc } from 'firebase/firestore';
import { AppProvider } from './AppContext';

const firebaseConfig = {
    apiKey: "AIzaSyBF0rmKT8uJJLJ4_a0tJzGaKOG0hIYOvy8",
	authDomain: "debug-club.firebaseapp.com",
	projectId: "debug-club",
	storageBucket: "debug-club.appspot.com",
	messagingSenderId: "377935123161",
	appId: "1:377935123161:web:2c93b065b1c45b1fc3a4c8",
	measurementId: "G-N17LCLESNJ"
}

const firebaseApp = initializeApp(firebaseConfig);

function App() {
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    const db = getFirestore(firebaseApp);
    const userCollectionRef = collection(db, "users");

    async function criarUser (e){
        e.preventDefault();
        try {
            await addDoc(userCollectionRef, { email, senha });
            console.log("Usuário criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
        }
    };
    this.criarUser = criarUser;

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, [userCollectionRef]);

    return (
        <App.Provider value={{ email, setEmail, senha, setSenha, criarUser }}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                </Routes>
            </Router>
            <form onSubmit={this.criarUser}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Criar Usuário</button>
            </form>
        </App.Provider>
    );
}

export default App;
export { firebaseApp };
