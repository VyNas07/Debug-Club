import React, { useContext } from 'react';
import './MainRegistration.css';
import {initializeApp} from 'firebase/app'
import { Outlet, Link } from "react-router-dom";
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png';
import App, { firebaseApp } from '../../../App';
import { AppContext } from '../../../AppContext';

const MainRegistration = () => {
	let app = App();

    const { email, setEmail, senha, setSenha, criarUser } = useContext(AppContext);

	return (
        <main className="flex">
        <div className="form">
          <div className='container-logo'>
            <a href='/'><img src={logoGitHub} alt='LogoGitHub' className='logoGitHub'></img></a>
          </div>
          <form action="/" method="post">
            <div className="caixa">
              <h1 className="textologin">Inscreva-se</h1>

              <div className="email">
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>

              <div className="senha">
                <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
              </div>

              <div className="confirmar-senha">
                <input type="password" placeholder="Confirmar Senha" required />
              </div>
            </div>

            <div className="entrar">
              <p>Já tem uma conta?
                <Link to='/login'><a href="/login/login.html" className="criar">Entrar</a></Link></p>
              <input onClick={criarUser} type="submit" value="Cadastrar" />
            </div>
          </form>
        </div>
      </main>
	)
}

export default MainRegistration

/*

import React from 'react';
import './MainRegistration.css';
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png';
import { Link } from "react-router-dom";

const MainRegistration = ({ setSenha, setEmail }) => {
    return (
        <main className="flex">
            <div className="form">
                <div className='container-logo'>
                    <a href='/'><img src={logoGitHub} alt='LogoGitHub' className='logoGitHub'></img></a>
                </div>
                <form action="/" method="post">
                    <div className="caixa">
                        <h1 className="textologin">Inscreva-se</h1>

                        <div className="email">
                            <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className="senha">
                            <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} required />
                        </div>

                        <div className="confirmar-senha">
                            <input type="password" placeholder="Confirmar Senha" required />
                        </div>
                    </div>

                    <div className="entrar">
                        <p>Já tem uma conta?
                            <Link to='/login'><a href="/login/login.html" className="criar">Entrar</a></Link></p>
                        <input type="submit" value="Cadastrar" />
                    </div>
                </form>
            </div>
        </main>
    )
}

export default MainRegistration;

*/