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
        localStorage.removeItem('isLogged2');
        localStorage.removeItem('nome_completo');
        localStorage.removeItem('userId');

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
                                src={`${backendIp}/${userPhoto}`}
                                alt={`${username}`}
                                className="user-photo"
                            />
                        )}

                        <button onClick={handleLogout} className="btn-logout">
                            <div class="sign-logout"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                            <div class="text-logout">Logout</div>
                        </button>



                    </div>
                ) : (
                    <PersonIcon className="profile-icon" onClick={() => navigate('/login')} style={{ color: 'white', fontSize: '35px', cursor: 'pointer' }} />
                )}
            </div>
        </header>
    );
};

export default Header;
