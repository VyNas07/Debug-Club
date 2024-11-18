import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {getUserContributionCounts} from '../countCollectionDocuments'

// elementos necessários p o gráfico de barras
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ContributionReviewChart({userId}) {
    const [contributionData, setContributionData] = useState({
        totalIssues: 0,
        totalCommits: 0,
        totalPullRequests: 0,
        totalForks: 0,
      });

      useEffect(() => {
        const fetchContributionData = async () => {
            console.log('Buscando dados para userId:', userId)
          const { totalIssues, totalCommits, totalPullRequests, totalForks } = await getUserContributionCounts(userId);
          setContributionData({
            totalIssues,
            totalCommits,
            totalPullRequests,
            totalForks,
          });
        };
        fetchContributionData();
  }, [userId]);
    const data = {
        labels: ['PR´s', 'Commits', 'Issues criadas', 'Forks'],
        datasets: [
            {
                label: 'Contribuições',
                data: [contributionData.totalPullRequests, contributionData.totalCommits, contributionData.totalIssues, contributionData.totalForks],
                backgroundColor: [
                    '#1E90FF',
                    '#FFD700',
                    '#4682B4',
                    '#D3D3D3',
                ],
                barThickness: 20, 
                maxBarThickness: 30, 
                categoryPercentage: 0.5, 
                barPercentage: 0.5, 
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', height: '300px', margin: '0 auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default ContributionReviewChart;
