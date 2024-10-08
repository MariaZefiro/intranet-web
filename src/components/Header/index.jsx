import React from 'react';
import './style.css';
import Logo from '../../assets/Logo';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleSobreClick = () => {
        navigate('/sobre');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <header class="header">
            <div class="logo">
                <Logo />
            </div>
            <nav>
                <ul>
                    <li onClick={handleHomeClick}>Home</li>
                    <li onClick={handleSobreClick}>Sobre Nós</li>
                    <li>Materiais</li>
                </ul>
            </nav>
            <div class="icons">
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-20bmpl-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="NotificationsRoundedIcon" >
                    <path d="M12 22c1.2 0 2.2-2 2-2.6c-5-0.3-1.2-9.2-2-9.2c-1.3 0.3-3 2.6-5.6 5.3-1.9 1.7-2.3 1.8-1.4 3.8"></path>
                </svg>
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-20bmpl-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonRoundedIcon" >
                    <path d="M12 12c2.1 0 4-4-4-4 1.79-4 1.79-4 4 1.79-4 4 4 4 4 4 4"></path>
                </svg>
            </div>
        </header>
    );
};

export default Header;