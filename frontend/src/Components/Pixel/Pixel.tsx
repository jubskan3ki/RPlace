import React from 'react';
import './Pixel.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store';
import { bonusSend } from '../../Redux/bonus.slice';
import { timeSend } from '../../Redux/time.slice'; // Assurez-vous que le chemin est correct.

interface PixelProps {
    color: string;
    x: number;
    y: number;
}

const Pixel: React.FC<PixelProps> = ({ color, x, y }) => {
    const selectedcolor = useSelector((state: RootState) => state.color.value);
    const isGrenade = useSelector((state: RootState) => state.bonus.value.bombe);
    const isLine = useSelector((state: RootState) => state.bonus.value.ligne);
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            if (isGrenade) {
                await axios.post('http://localhost:5000/api/pixels/grenade', {
                    "x": x,
                    "y": y,
                    "color": selectedcolor
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                dispatch(bonusSend({ bombe: false, ligne: false }));
            } else if (isLine) {
                await axios.post('http://localhost:5000/api/pixels/line', {
                    "x": x,
                    "y": y,
                    "color": selectedcolor
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                dispatch(bonusSend({ bombe: false, ligne: false }));
            } else {
                await axios.post('http://localhost:5000/api/pixels', {
                    "x": x,
                    "y": y,
                    "color": selectedcolor
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
            }
            window.location.reload();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response && err.response.status === 429) {
                    const timeLeft = err.response.data.timeLeft;
                    dispatch(timeSend(timeLeft));
                } else {
                    console.error('Erreur lors de la mise à jour du pixel:', err);
                }
            } else {
                console.error('Erreur lors de la mise à jour du pixel:', err);
            }
        }
    };

    return <div className="pixel" style={{ backgroundColor: color, border: "1px solid" + color }} onClick={handleClick}></div>;
}

export default Pixel;
