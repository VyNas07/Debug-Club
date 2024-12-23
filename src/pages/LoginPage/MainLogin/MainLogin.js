// src/pages/LoginPage/MainLogin.js
import React, { useState } from 'react';
import './MainLogin.css';
import { Link, useNavigate } from "react-router-dom";
import { db } from '../../../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

const MainLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !password) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('name', '==', name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage('Nome não cadastrado.');
        return;
      }

      const userDoc = querySnapshot.docs[0];

      if (userDoc.data().password !== password) {
        setErrorMessage('Senha incorreta.');
        return;
      }

      // Apenas redireciona o usuário para a página de perfil, sem recalcular a pontuação
      navigate('/profile');
      
    } catch (error) {
      setErrorMessage('Erro ao fazer login.');
      console.error('Erro ao fazer login:', error);
      console.log('Erro na MainLogin');
    }
  };

  return (
    <main className='flex'>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="caixa">
            <h1 className="text-login">Login</h1>
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
          </div>
          <div className="entrar">
            <p>Ainda não tem conta?
              <Link to='/registration' className="criar"> Criar</Link>
            </p>
            <input type="submit" value="Entrar" />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
};

export default MainLogin;
