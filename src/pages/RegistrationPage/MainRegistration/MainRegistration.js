import React, { useState } from 'react';
import { githubLogin, checkNameAvailability, registerUser } from '../../../services/authService';
import './MainRegistration.css';
import { Link, useNavigate } from "react-router-dom";
import { integrateGithubData } from '../../../services/githubIntegration';
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const MainRegistration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [githubToken, setGithubToken] = useState('');
    const [githubUsername, setGithubUsername] = useState('');
    const navigate = useNavigate();

    const handleGitHubLogin = async () => {
        const result = await githubLogin();
        if (result.success) {
            setGithubToken(result.token);
            setGithubUsername(result.username); // Armazena o username do GitHub
            console.log('GitHub login bem-sucedido:', result);
        } else {
            setErrorMessage(result.error);
        }
    };

    const validateName = (name) => {
        return name.length >= 5 && name.length <= 20;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validateName(name)) {
            setErrorMessage('O nome deve ter no mínimo 5 caracteres e no máximo 20.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('A senha deve ter no mínimo 6 caracteres, uma letra maiúscula e um número.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('As senhas não coincidem.');
            return;
        }
        if (!githubUsername || !githubToken) {
            setErrorMessage('Conexão com o GitHub não foi realizada. Por favor, autentique-se com o GitHub.');
            return;
        }
        try {
            const isNameAvailable = await checkNameAvailability(name);
            if (!isNameAvailable) {
                setErrorMessage('Este nome já está em uso.');
                return;
            }

            // Registro do usuário no Firebase
            await registerUser(name, password, githubUsername);
            console.log('Usuário registrado com sucesso:', name);

            // Armazenar GitHubToken e GitHubUsername no Firestore após confirmação de cadastro
            const user = auth.currentUser;
            await setDoc(doc(db, 'users', user.uid), {
                githubUsername, // Armazena o username do GitHub
                githubToken
            }, { merge: true });

            // Integração do GitHub com o token
            await integrateGithubData(githubUsername, user.uid);

            setConfirmationMessage('Cadastro realizado com sucesso! Issues integradas.');
            setName('');
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('');
            navigate('/profileedit'); // Redireciona para a página de perfil após cadastro bem-sucedido
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <main className="flex">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="caixa">
                        <h1 className="textologin">Inscreva-se</h1>
                        <div className='container-logo'>
                            <p className="login-github">Cadastrar GitHub:</p>
                            <img
                                src={logoGitHub}
                                alt='LogoGitHub'
                                className='logoGitHub'
                                onClick={handleGitHubLogin}
                            />
                        </div>
                        <div className="nome">
                            <input 
                                className="input-field"
                                type="text" 
                                placeholder="Nome" 
                                required 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="senha">
                            <input 
                                className="input-field"
                                type="password" 
                                placeholder="Senha" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="confirmar-senha">
                            <input 
                                className="input-field"
                                type="password" 
                                placeholder="Confirmar Senha" 
                                required 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </div>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
                    <div className="entrar">
                        <p>Já tem uma conta?
                            <Link to='/login' className="criar">Entrar</Link>
                        </p>
                        <input type="submit" value="Cadastrar" />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default MainRegistration;
