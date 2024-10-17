import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const criarUser = () => {
    // Lógica para criar usuário
  };

  return (
    <AppContext.Provider value={{ email, setEmail, senha, setSenha, criarUser }}>
      {children}
    </AppContext.Provider>
  );
};