import React, { useEffect, useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';

import {initializeApp} from 'firebase/app'
import { collection, getFirestore, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
	apiKey: "AIzaSyBF0rmKT8uJJLJ4_a0tJzGaKOG0hIYOvy8",
	authDomain: "debug-club.firebaseapp.com",
	projectId: "debug-club",
	storageBucket: "debug-club.appspot.com",
	messagingSenderId: "377935123161",
	appId: "1:377935123161:web:2c93b065b1c45b1fc3a4c8",
	measurementId: "G-N17LCLESNJ"
});

function App() {
	const [senha, setSenha] = useState("");
	const [email, setEmail] = useState("");
	const [users, setUsers] = useState([]);

	const db = getFirestore(firebaseApp);
	const userCollectionRef = collection(db, "users");


	function criarUser() {
		console.log({email, senha});
	}

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(userCollectionRef);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		}
		getUsers();
	},[])

	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/registration" element={<RegistrationPage />} />
			</Routes>
		</Router>
	);
}

export default App;
export { firebaseApp };
