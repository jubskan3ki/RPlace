import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BonusTools from '../../Components/BonusTools/BonusTools';
import PixelBoard from '../../Components/PixelBoard/PixelBoard';
import Titre from '../../Components/Titre/Titre';
import './Home.css';

interface Pixel {
    x: number;
    y: number;
    color: string;
    username: string;
    _id: string;
    timestamp: string;
    __v: number;
}

const Home: React.FC = () => {
    const [data, setData] = useState<Pixel[]>([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/pixels';
        const token = localStorage.getItem('authToken');

        axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error("Il y a eu une erreur lors de la récupération des données", error);
        });
    }, []);
    
    return (
        <div className="home-page Content">
            <Titre title="Tableau de Pixels"/>
            <BonusTools />
            <PixelBoard rawData={data} />
        </div>
    );
}

export default Home;
