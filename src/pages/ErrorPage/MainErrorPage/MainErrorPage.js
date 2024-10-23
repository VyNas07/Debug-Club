import React from 'react';
import './MainErrorPage.css';

const MainErrorPage = () => {
  return (
    <main className="error-page">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <p>Pode ter sido removida, alterada ou está temporariamente indisponível.</p>
    </main>
  );
};

export default MainErrorPage;
