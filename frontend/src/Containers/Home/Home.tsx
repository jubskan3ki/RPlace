import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import io from 'socket.io-client';
import { RootState } from '../../Redux/store';
import { timeSend } from '../../Redux/time.slice';
import BonusTools from '../../Components/BonusTools/BonusTools';
import PixelBoard from '../../Components/PixelBoard/PixelBoard';
import Notif from '../../Components/Notif/Notif';
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
    const isMounted = React.useRef(false); 

    const [data, setData] = useState<Pixel[]>([]);
    const notification = useSelector((state: RootState) => state.time.value);
    const dispatch = useDispatch();

    const closeNotification = () => {
        dispatch(timeSend(0));
    };
    // const apiUrl = 'http://localhost:5000/api/pixels';

    useEffect(() => {

        if (isMounted.current) return
        // const token = localStorage.getItem('authToken');

        // axios.get(apiUrl, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        // .then(response => {
        //     setData(response.data);
        // })
        // .catch(error => {
        //     console.error("Il y a eu une erreur lors de la récupération des données", error);
        // });

        const socket = io('http://localhost:5000'); 

        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.on('pixels', (updatedPixels: Pixel[]) => {
            setData(updatedPixels);
        });

        isMounted.current = true;

        return () => {
            socket.disconnect();
        };
    }, []);
    
    return (
        <>
            {notification !== 0 ? (
                <Notif
                    type={'error'}
                    message={`Veuillez attendre ${notification} secondes avant de pouvoir modifier un pixel`}
                    onClick={closeNotification}
                />
            ) : null}
            <div className="home-page Content">
                <Titre title="Tableau de Pixels"/>
                <BonusTools />
                <PixelBoard rawData={data} />
            </div>
        </>
    );
}

export default Home;
