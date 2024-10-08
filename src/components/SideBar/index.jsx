import React from 'react';
import './style.css';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  ChakraProvider,
} from '@chakra-ui/react';


const Sidebar = () => {
  const navigate = useNavigate();

  const handleRamaisClick = () => {
    navigate('/ramais');
  };

  return (
    <div className="sidebar">
      <div className="apps-section">
        <h3>Meus Aplicativos</h3>
        <div className="apps">
          <div className="app-icon lesteboard-icon"></div>
          <div className="app-icon other-icon"></div>
          <ChakraProvider resetCSS={false}>
            <Popover>
              <PopoverTrigger>
                <div className="app-icon add-icon">+</div>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Favoritos</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </ChakraProvider>
        </div>
      </div>

      <div className="quick-access">
        <h3>Acesso Rápido</h3>
        <ul>
          <li><div className="app-icon2"><PersonRoundedIcon style={{ color: '#045441' }} /></div> Lesteboard</li>
          <li><div className="app-icon2"><SupportAgentRoundedIcon style={{ color: '#045441' }} /></div> Chamado</li>
          <li onClick={handleRamaisClick}><div className="app-icon2"><CallRoundedIcon style={{ color: '#045441' }} /></div> Lista de ramais</li>
          <li><div className="app-icon2"><HeadphonesRoundedIcon style={{ color: '#045441' }} /></div> Solicitar suporte</li>
        </ul>
      </div>

      <div className="team">
        <h3>Nosso time</h3>
        <div className="team-member">
          <div className="avatar"><PersonIcon style={{ color: 'white', fontSize: '40px' }} /></div>
          <div className="member-info">
            <p>Matheus Perim</p>
            <span>Aniversário em 3 dias</span>
          </div>
        </div>
        <div className="team-member">
          <div className="avatar"><PersonIcon style={{ color: 'white', fontSize: '40px' }} /></div>
          <div className="member-info">
            <p>Matheus Perim</p>
            <span>Aniversário em 3 dias</span>
          </div>
        </div>
        <div className="team-member">
          <div className="avatar"><PersonIcon style={{ color: 'white', fontSize: '40px' }} /></div>
          <div className="member-info">
            <p>Matheus Perim</p>
            <span>Aniversário em 3 dias</span>
          </div>
        </div>
        <div className="team-member">
          <div className="avatar"><PersonIcon style={{ color: 'white', fontSize: '40px' }} /></div>
          <div className="member-info">
            <p>Matheus Perim</p>
            <span>Aniversário em 3 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;