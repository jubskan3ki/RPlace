import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Notif, { NotifProps } from '../../Components/Notif/Notif';
import imgLogin from '../../assets/login.svg';
import imgSignup from '../../assets/signup.svg';
import axios from 'axios';
import './Auth.css';

const Auth: React.FC = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState<NotifProps | null>(null);

    const closeNotification = () => {
        setNotification(null);
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (isLogin) {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    username,
                    email,
                    password
                });
                localStorage.setItem('authToken', response.data.token);
                navigate('/Home');
            } else {
                if (password !== confirmPassword) {
                    setNotification({ type: 'error', message: 'Les mots de passe ne correspondent pas!' });
                    return;
                }
                const response = await axios.post('http://localhost:5000/api/auth/signup', {
                    username,
                    password
                });
                localStorage.setItem('authToken', response.data.token);
                navigate('/Home');
            }
        } catch (error) {
            setNotification({
                type: 'error',
                message: "Une erreur s'est produite lors de l'authentification"
            });
            console.error(error);
        }
    };

    return (
        <>
            <Notif
                type={notification && notification.type}
                message={notification && notification.message}
                onClick={closeNotification}
            />
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
                    <img src={isLogin ? imgLogin : imgSignup} alt="img" />
                    <Input type="text" value={username} onChange={setUsername} placeholder="Nom d'utilisateur" />
                    <Input type="password" value={password} onChange={setPassword} placeholder="Mot de passe" />
                    {!isLogin && (
                        <>
                            <Input type="email" value={email} onChange={setEmail} placeholder="Email" />
                            <Input type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirmer le mot de passe" />
                        </>
                    )}
                    <Button type='submit' label={isLogin ? 'Se connecter' : 'S\'inscrire'} />
                    <small onClick={toggleAuthMode}>
                        {isLogin ? "Pas encore de compte? S'inscrire" : 'Déjà un compte? Se connecter'}
                    </small>
                </form>
            </div>
        </>
    );
};

export default Auth;
