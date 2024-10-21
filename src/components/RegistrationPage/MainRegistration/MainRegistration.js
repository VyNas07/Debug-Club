import React from 'react';
import { auth } from '../../../firebase';
import './MainRegistration.css';
import { Outlet, Link } from "react-router-dom";
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const MainRegistration = () => {
    const handleGitHubLogin = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const token = result.credential.accessToken;
                console.log('Usuário logado: ', user);
                console.log('Token de Acesso: ', token);
            })
            .catch((error) => {
                console.error('Erro no login com GitHub: ', error);
            });
    }

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
                <form action="/" method="post">
                    <div className="caixa">
                        <h1 className="textologin">Inscreva-se</h1>
                        <div className="email">
                            <input type="email" placeholder="E-mail" required />
                        </div>
                        <div className="senha">
                            <input type="password" placeholder="Senha" required />
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
}

export default MainRegistration;
