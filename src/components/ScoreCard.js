import React, { useEffect, useState } from 'react';
import { getUserPointsById } from '../services/scoreService';

const ScoreCard = ({ userId }) => { 
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!userId) {
        console.error('userId está indefinido');
        return;
      }

      try {
        const userPoints = await getUserPointsById(userId);
        setScore(userPoints);
      } catch (error) {
        console.error('Erro ao buscar pontos do usuário:', error);
      }
    };

    fetchPoints();
  }, [userId]);

  return (
    <div className="score-card">
      <h2>Pontuação</h2>
      <p>{score} pontos</p>
    </div>
  );
};

export default ScoreCard;
