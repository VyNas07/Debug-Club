import React, { useState } from 'react'; // 'useState' com "S" maiúsculo
import { auth, db } from '../../../firebase'; 
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import './MainRegistration.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png';

const MainRegistration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleGitHubLogin = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                const token = result.credential.accessToken;

                navigate('/registration'); //
            })
            .catch((error) => {
                console.error('Erro no login com GitHub: ', error);
            });
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

        if (!validateName(name)) {
            alert('O nome deve ter no mínimo 5 caracteres e no máximo 20.');
            return;
        }

        if (!validatePassword(password)) {
            alert('A senha deve ter no mínimo 6 caracteres, uma letra maiúscula e um número.');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const nameQuery = query(collection(db, 'users'), where('name', '==', name));
            const nameQuerySnapshot = await getDocs(nameQuery);

            if (!nameQuerySnapshot.empty) {
                alert('Este nome já está em uso.');
                return;
            }

            const user = auth.currentUser;
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (userDoc.exists()) {
                alert('Você já possui uma conta com este GitHub.');
                return;
            }

            await setDoc(doc(db, 'users', user.uid), {
                name,
                password,
                github: user.providerData[0].displayName
            });

            console.log('Usuário registrado com sucesso!');
            setConfirmationMessage('Cadastro realizado com sucesso!');
            setName('');
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('');
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
        }
    };

    return (
        <main className="flex">
            <div className="form">
                <div className='container-logo'>
                    <img
                        src={logoGitHub}
                        alt='LogoGitHub'
                        className='logoGitHub'
                        onClick={handleGitHubLogin}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="caixa">
                        <h1 className="textologin">Inscreva-se</h1>
                        <div className="nome">
                            <input 
                                type="text" 
                                placeholder="Nome" 
                                required 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="senha">
                            <input 
                                type="password" 
                                placeholder="Senha" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="confirmar-senha">
                        <input 
                                type="password" 
                                placeholder="Confirmar Senha" 
                                required 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="entrar">
                        <p>Já tem uma conta?
                            <Link to='/login' className="criar">Entrar</Link>
                        </p>
                        <input type="submit" value="Cadastrar" />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
                </form>
            </div>
        </main>
    );
};

export default MainRegistration;
