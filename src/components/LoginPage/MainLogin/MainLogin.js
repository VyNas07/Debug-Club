import React from 'react';
import './MainLogin.css';
import { Outlet, Link } from "react-router-dom";

const MainLogin = () => {
  return (
    <main className='flex'>
      <div className="form">
        <form action="/" method="post">
          <div className="caixa">
            <h1 className="textologin">Login</h1>
            <div className="email">
              <input type="email" placeholder="E-mail" required />
            </div>

            <div className="senha">
              <input type="password" placeholder="Senha" required />
            </div>
          </div>

          <div className="entrar">
            <p>Ainda não tem conta?
            <Link to = '/registration'>
            <a href="/cadastro/cadastro.html" className="criar">Criar</a></Link>
            </p>
            
            <input type="submit" value="Entrar" />
          </div>
        </form>
      </div>
    </main>
  );
}

export default MainLogin;
