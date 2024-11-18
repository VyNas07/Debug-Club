import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-circle"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default LoadingScreen;
