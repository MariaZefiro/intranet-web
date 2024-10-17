import React, { useEffect, useState } from 'react';
import './style.css';
import Logo from '../../assets/Logo';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import config from '../../config';

const Header = () => {
    const backendIp = config.backend_ip;
    const navigate = useNavigate();
    const [userPhoto, setUserPhoto] = useState(null);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const username = localStorage.getItem('username');


    useEffect(() => {
        if (username) {
            fetchUserData();
        }
    }, [username]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${backendIp}/api/users?username=${username}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            const data = await response.json();
            if (data.length > 0) {
                setUserPhoto(data[0].url_foto);
            } else {
                console.error('Usuário não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    const handleSobreClick = () => {
        navigate('/sobre');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('username');
        localStorage.removeItem('isLogged');
        setUserPhoto(null);
        window.location.reload();
    };

    const handleAdminClick = () => {
        navigate('/admin');
    };

    const handleTeamClick = () => {
        navigate('/time');
    };

    return (
        <header className="header">
            <div className="logo">
                <Logo />
            </div>
            <nav>
                <ul>
                    <li onClick={handleHomeClick}>Home</li>
                    <li onClick={handleSobreClick}>Sobre Nós</li>
                    <li onClick={handleTeamClick}>Nosso Time</li>
                    {isAdmin && <li onClick={handleAdminClick}>Administração</li>}
                </ul>
            </nav>
            <div className="icons">
                {username ? (
                    <div className="user-container">
                        {userPhoto && (
                            <img
                                src={`http://10.1.254.46:5000/${userPhoto}`}
                                alt={`${username}`}
                                className="user-photo"
                            />
                        )}
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                ) : (
                    <PersonIcon onClick={() => navigate('/login')} style={{ color: 'white', fontSize: '35px', cursor: 'pointer' }} />
                )}
            </div>
        </header>
    );
};

export default Header;
