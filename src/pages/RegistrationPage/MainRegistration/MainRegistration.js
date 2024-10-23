import React, { useState } from 'react'; // 'useState' com "S" maiúsculo
import { auth, db } from '../../../firebase'; 
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './MainRegistration.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png';

const MainRegistration = () => {
    const [name, setName] = useState('');  // Correto uso do useState
    const [password, setPassword] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;

            await setDoc(doc(db, 'users', user.uid), {
                name,
                password,
                github: user.providerData[0].displayName
            });

            console.log('Usuário registrado com sucesso!');
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
                            <input type="password" placeholder="Confirmar Senha" required />
                        </div>
                    </div>
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
