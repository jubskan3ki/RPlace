import React, { useState, useEffect } from 'react';
import Titre from '../../Components/Titre/Titre';
import axios from 'axios';
import './Profil.css';

// Définition du type pour une entrée d'historique
type HistoryEntry = {
    x: number;
    y: number;
    color: string;
    timestamp: string;  // Supposant que le timestamp est une chaîne; ajustez selon vos besoins.
};

const UserProfile: React.FC = () => {
    // Utilisation du type pour définir le type d'état
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {

        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pixels/history', 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                );
                // Assurez-vous que l'API renvoie la liste d'historique correctement typée
                setHistory(response.data as HistoryEntry[]);
            } catch (err) {
                console.error('Erreur lors de la récupération de l\'historique:', err);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="history-container Content">
            <Titre title="Historique des Pixels"/>
                <div className="GridHistory">
                    <div className="GridHistoryItem">
                        <h4>X</h4>
                        <h4>Y</h4>
                        <h4>Color</h4>
                        <h4>Date</h4>
                    </div>
                    {history.map((entry, index) => (
                        <div className="GridHistoryItem" key={index}>
                            <p key={`x-${index}`}>{entry.x}</p>
                            <p key={`y-${index}`}>{entry.y}</p>
                            <p key={`color-${index}`}>{entry.color}</p>
                            <p key={`timestamp-${index}`}>{entry.timestamp}</p>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default UserProfile;
