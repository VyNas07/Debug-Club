import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// elementos q são necessários para o gráfico de pizza
ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
);

function ContributionChart() {
    const data = {
        labels: ['Aceitas', 'Em Análise'],
        datasets: [
            {
                label: 'Contribuições',
                data: [96, 51],
                backgroundColor: [
                    '#7E72FF',
                    '#E0C6FD', 
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

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
