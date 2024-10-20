import React from 'react';
import './ErrorPage.css'; // Importação do CSS para a estilização da página

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <p>Pode ter sido removida, alterada ou está temporariamente indisponível.</p>
    </div>
  );
};

export default ErrorPage;
