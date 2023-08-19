import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bonusSend } from '../../Redux/bonus.slice'; // Assurez-vous que le chemin est correct.
import { RootState } from '../../Redux/store'; // Assurez-vous que le chemin est correct.
import { colorSend } from '../../Redux/color.slice'; // Assurez-vous que le chemin est correct.
import './BonusTools.css';
import Button from '../Button/Button';

const BonusTools: React.FC = () => {
    const dispatch = useDispatch();

    const handleGrenadeClick = () => {
        dispatch(bonusSend({ bombe: true, ligne: false }));
    }

    const handleLineClick = () => {
        dispatch(bonusSend({ bombe: false, ligne: true }));
    }

    const color = useSelector((state: RootState) => state.color.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(colorSend(event.target.value));
    };

    return (
        <div className="bonus-tools">
            <Button label="Grenade de couleurs" onClick={handleGrenadeClick}/>
            <Button label="Ligne de couleurs" onClick={handleLineClick}/>
            <label className='labelColor' style={{ backgroundColor: color }} htmlFor="InputColor">
                <input className='InputColor' type="color" id='InputColor' value={color} onChange={handleChange} />
            </label>
        </div>
    );

}

export default BonusTools;
