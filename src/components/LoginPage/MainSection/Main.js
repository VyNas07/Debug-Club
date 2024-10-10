import React from 'react';
import './Main.css';

const Main = () => {
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
            <p>Ainda não tem conta? <a href="/cadastro/cadastro.html" className="criar">Criar</a></p>
            <input type="submit" value="Entrar" />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Main;
