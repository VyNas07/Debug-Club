import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// elementos necessários p o gráfico de barras
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ContributionReviewChart() {
    const data = {
        labels: ['PR´s', 'Commits', 'Issues criadas', 'Forks'],
        datasets: [
            {
                label: 'Contribuições',
                data: [200, 105, 2113, 600],
                backgroundColor: [
                    '#FF6B6B',
                    '#FFD93D',
                    '#4CAF50',
                    '#808080', 
                ],
                barThickness: 15, 
                maxBarThickness: 20, 
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
        <div style={{ width: '100%', maxWidth: '400px', height: '250px', margin: '0 auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default ContributionReviewChart;
