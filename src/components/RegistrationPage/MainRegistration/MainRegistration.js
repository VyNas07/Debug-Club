import React from 'react'
import './MainRegistration.css'
import { Outlet, Link } from "react-router-dom";
import logoGitHub from '../../../assets/IMG-RegistrationPage/githubazul.png'


const MainRegistration = () => {
  return (
    <main className="flex">
    <div className="form">
        <div className='container-logo'><a href='/'><img src= {logoGitHub} alt = 'LogoGitHub' className='logoGitHub'></img></a></div>
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
                    <Link to = '/login'><a href="/login/login.html" className="criar"> Entrar</a></Link></p>
                <input type="submit" value="Cadastrar" />
            </div>
        </form>
    </div>
</main>
  )
}

export default MainRegistration
