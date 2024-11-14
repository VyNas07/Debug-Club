import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Header2 from '../../components/Header2/Header2';
import ProfileIcon from '../../assets/IMG-ProfilePage/profileimg.png';
import ContributionChart from '../../components/ContributionChart/ContributionChart';
import ContributionReviewChart from '../../components/ContributionReviewChart/ContributionReviewChart';
import { db } from '../../firebase'; // Supondo que já tenha configurado o Firestore
import { doc, getDoc } from 'firebase/firestore';

function Dashboard() {
    const [score, setScore] = useState(0);
    const [contributions, setContributions] = useState({ issues: 0, commits: 0, prs: 0, forks: 0 });

    useEffect(() => {
        const fetchUserData = async () => {
            // Pega os dados do usuário do Firestore
            const userRef = doc(db, 'users', 'user_id'); // Substitua 'user_id' pelo ID do usuário
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setScore(userDoc.data().score || 0);

                // Pega as contribuições (issues, commits, PRs, forks)
                const issuesRef = userRef.collection('issues');
                const commitsRef = userRef.collection('commits');
                const prsRef = userRef.collection('pullRequests');
                const forksRef = userRef.collection('forks');

                setContributions({
                    issues: (await issuesRef.get()).size,
                    commits: (await commitsRef.get()).size,
                    prs: (await prsRef.get()).size,
                    forks: (await forksRef.get()).size
                });
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="header-content">
            <Header2 />
            <div className="container-general">
                <div className="container-separate">
                    <div className="profile">
                        <img src={ProfileIcon} alt="Foto do Perfil" />
                        <h2>Diego Souza</h2>
                        <p className="role">Explorador de Bugs</p>
                    </div>

                    <div className="reviews">
                        <h3>Contribuições:</h3>
                        <ContributionReviewChart data={contributions} />
                    </div>
                </div>

                <div className="second-container-separate">
                    <div className="progress">
                        <h3>Próximo Título:</h3>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(score / 100) * 100}%` }}></div>
                        </div>
                        <p>Desbravador de Problemas</p>
                    </div>

                    <div className="last-contribution">
                        <h3>Última Contribuição:</h3>
                        <div className="contribution-detail">
                            <p>Corrigir bug de login</p>
                            <div className="status-date">
                                <span className="status">Fechada</span>
                                <p className="date">21/09/2020</p>
                            </div>
                        </div>
                    </div>

                    <div className="contributions">
                        <div className="chart">
                            <h3>Histórico de Contribuições:</h3>
                            <ContributionChart data={contributions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
