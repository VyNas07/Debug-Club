import React, { useContext, useState } from 'react';
import './MainRegistration.css';
import { Link } from "react-router-dom";
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png';
import { AppContext } from '../../../AppContext';

function MainRegistration(){
  [this.users, this.setUsers] = useState([]);

  [this.email, this.setEmail, this.senha, this.setSenha, this.criarUser] = useContext(AppContext);

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
              <input type="email" placeholder="E-mail" value={this.email} onChange={e => this.setEmail(e.target.value)} required />
            </div>

            <div className="senha">
              <input type="password" placeholder="Senha" value={this.senha} onChange={e => this.setSenha(e.target.value)} required />
            </div>

            <div className="confirmar-senha">
              <input type="password" placeholder="Confirmar Senha" required />
            </div>
          </div>

          <div className="entrar">
            <p>Já tem uma conta?
              <Link to='/login'><a href="/login/login.html" className="criar">Entrar</a></Link>
            </p>
            <button onClick={this.criarUser} type="button">Cadastrar</button>
          </div>

        
        </form>
      </div>
    </main>
  )
}

export default MainRegistration