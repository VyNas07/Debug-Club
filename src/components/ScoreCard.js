import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ScoreCard = ({ userId }) => { 
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!userId) {
      console.error('userId está indefinido');
      return;
    }

    const userRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setScore(doc.data().score || 0);
      }
    });

    return () => unsubscribe(); // Cleanup para remover o listener
  }, [userId]);

  return (
    <div className="score-card">
      <h2>Pontuação</h2>
      <p>{score} pontos</p>
    </div>
  );
};

export default ScoreCard;
