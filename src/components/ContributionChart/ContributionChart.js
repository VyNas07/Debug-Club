import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { db } from '../../firebase';
import { getUserContributionCounts } from '../countCollectionDocuments';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function ContributionChart({ userId }) {
  const [data, setData] = useState({
    labels: ['Pull Requests', 'Commits', 'Issues Criadas', 'Forks'],
    datasets: [
      {
        label: 'Pontos (%)',
        data: [0, 0, 0, 0],
        backgroundColor: ['#1E90FF', '#FFD700', '#4682B4', '#D3D3D3'],
        borderColor: ['#FF6B6B', '#FFD93D', '#4CAF50', '#808080'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchContributionData = async () => {
      if (!userId) return;

      try {
        console.log('Buscando dados para userId:', userId);
        
        // Obter as contagens de contribuições do Firebase
        const { totalIssues, totalCommits, totalPullRequests, totalForks } = await getUserContributionCounts(userId);

        // Exibindo as contagens
        console.log('Total de Issues:', totalIssues);
        console.log('Total de Commits:', totalCommits);
        console.log('Total de Pull Requests:', totalPullRequests);
        console.log('Total de Forks:', totalForks);

        // Calcular a pontuação para cada atividade
        const issuePoints = totalIssues * 5;
        const commitPoints = totalCommits * 3;
        const prPoints = totalPullRequests * 10;
        const forkPoints = totalForks * 2;

        console.log('Pontos por Issues:', issuePoints);
        console.log('Pontos por Commits:', commitPoints);
        console.log('Pontos por Pull Requests:', prPoints);
        console.log('Pontos por Forks:', forkPoints);

        // Aqui, a variável totalScore deve ser calculada com base em alguma lógica que você tenha
        const totalScore = issuePoints + commitPoints + prPoints + forkPoints;

        // Calcular as porcentagens de cada tipo de contribuição
        const issuePercentage = totalScore ? ((issuePoints / totalScore) * 100).toFixed(2) : 0;
        const commitPercentage = totalScore ? ((commitPoints / totalScore) * 100).toFixed(2) : 0;
        const prPercentage = totalScore ? ((prPoints / totalScore) * 100).toFixed(2) : 0;
        const forkPercentage = totalScore ? ((forkPoints / totalScore) * 100).toFixed(2) : 0;

        console.log('Percentual de Issues:', issuePercentage);
        console.log('Percentual de Commits:', commitPercentage);
        console.log('Percentual de Pull Requests:', prPercentage);
        console.log('Percentual de Forks:', forkPercentage);

        // Atualizar dados do gráfico com as porcentagens
        setData({
          labels: ['Pull Requests', 'Commits', 'Issues Criadas', 'Forks'],
          datasets: [
            {
              label: 'Pontos(%)',
              data: [prPercentage, commitPercentage, issuePercentage, forkPercentage],
              backgroundColor: ['#1E90FF', '#FFD700', '#4682B4', '#D3D3D3'],
              borderColor: ['#FF6B6B', '#FFD93D', '#4CAF50', '#808080'],
              borderWidth: 1,
            },
          ],
        });
        console.log('Dados do gráfico atualizados:', {
          prPercentage,
          commitPercentage,
          issuePercentage,
          forkPercentage,
        });
      } catch (error) {
        console.error('Erro ao buscar dados de contribuição:', error);
      }
    };

    fetchContributionData();
  }, [userId]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ width: '300px', height: '220px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default ContributionChart;
