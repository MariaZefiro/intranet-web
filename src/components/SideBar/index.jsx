import React, { useState, useEffect } from 'react';
import './style.css';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';
import { useNavigate } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import axios from 'axios';
import config from '../../config';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  ChakraProvider,
} from '@chakra-ui/react';

const Sidebar = () => {
  const backendIp = config.backend_ip;
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);
  const [acessoRapido, setAcessoRapido] = useState([]);
  const [aplicativos, setAplicativos] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState([]);

  useEffect(() => {
    handleListAvisos();
    handleListAcessoRapido();
    handleAplicativos();

    const savedIcons = localStorage.getItem('selectedSocialIcons');
    if (savedIcons) {
      setSelectedIcons(JSON.parse(savedIcons));
    }
  }, []);

  const handleAplicativos = () => {
    axios.get(`${backendIp}/api/aplicativos`)
      .then(response => {
        setAplicativos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar aplicativos:", error);
      });
  }

  const handleListAvisos = () => {
    axios.get(`${backendIp}/api/list_avisos`)
      .then(response => setAvisos(response.data))
      .catch(error => console.error(error));
  };

  const handleListAcessoRapido = () => {
    axios.get(`${backendIp}/api/acesso_rapido`)
      .then(response => setAcessoRapido(response.data))
      .catch(error => console.error(error));
  };

  const handleIconClick = (icon) => {
    const isSelected = selectedIcons.find(selected => selected.id === icon.id);

    if (isSelected) {
      const updatedIcons = selectedIcons.filter(selected => selected.id !== icon.id);
      setSelectedIcons(updatedIcons);
      localStorage.setItem('selectedSocialIcons', JSON.stringify(updatedIcons));
    } else {
      const updatedIcons = [...selectedIcons, icon];
      setSelectedIcons(updatedIcons);
      localStorage.setItem('selectedSocialIcons', JSON.stringify(updatedIcons));
    }
  };


  const handleRamaisClick = () => {
    navigate('/ramais');
  };

  const handleSobreClick = () => {
    navigate('/sobre');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleTeamClick = () => {
    navigate('/time');
  };

  const iconMapping = {
    'suporte': <SupportAgentRoundedIcon />,
    'fone': <HeadphonesRoundedIcon />,
    'anúncio': <AnnouncementRoundedIcon />,
    'telephone': <CallRoundedIcon />,
    'aviso': <WarningAmberIcon />,
    'person': <PersonRoundedIcon />,
    'home': <HomeIcon />,
    'sobre': <InfoIcon />,
    'time': <GroupsIcon />,
  };

  const iconLink = {
    'ramais': handleRamaisClick,
    'sobre': handleSobreClick,
    'home': handleHomeClick,
    'time': handleTeamClick,
  };

  const handleAppClick = (link) => {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  return (
    <div className="sidebar">
      <div className="apps-section">
        <h3>Meus Aplicativos</h3>
        <div className="apps">
          {selectedIcons.map(icon => (
            <div key={icon.id} className="app-icon">
              <img
                src={`http://10.1.254.46:5000/${icon.icone_url}`}
                alt={icon.nome}
                style={{ width: '30px', cursor: 'pointer' }}
                onClick={() => handleAppClick(icon.link)}
              />
            </div>
          ))}

          <ChakraProvider resetCSS={false}>
            <Popover>
              <PopoverTrigger>
                <div className="app-icon add-icon">+</div>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader style={{ padding: '15px' }}>Selecione um Aplicativo</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <div className="icon-options">
                      {aplicativos.map((app) => (
                        <div
                          key={app.id}
                          className="icon-item"
                          onClick={() => handleIconClick(app)}
                          style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center' }}
                        >
                          <img
                            src={`http://10.1.254.46:5000/${app.icone_url}`}
                            alt={app.nome}
                            style={{ width: '30px', marginRight: '10px' }}
                          />
                          {app.nome}
                        </div>
                      ))}
                    </div>
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
          {acessoRapido.length > 0 ? (
            acessoRapido.map(acesso => (
              <li onClick={() => iconLink[acesso.link]()} key={acesso.id}>
                <div className="app-icon2">
                  {iconMapping[acesso.tipo]}
                </div>
                {acesso.nome}
              </li>
            ))
          ) : (
            <p>Não há acessos rápidos no momento.</p>
          )}
        </ul>
      </div>

      <div className="news-and-events">
        <h3>Notícias e Avisos</h3>
        {avisos.length > 0 ? (
          avisos.map(aviso => (
            <div key={aviso.id} className="news-item">
              <div className="news-icon">
                <AnnouncementRoundedIcon style={{ color: '#009373', fontSize: '30px' }} />
              </div>
              <div className="news-info">
                <p>{aviso.titulo}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Não há avisos no momento.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
