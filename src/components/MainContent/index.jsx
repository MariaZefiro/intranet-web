import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './style.css';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const MainContent = () => {
  const backendIp = config.backend_ip;
  const [greeting, setGreeting] = useState('');
  const [events, setEvents] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const navigate = useNavigate();

  const nome_completo = localStorage.getItem('nome_completo') || ''; 
  const primeiro_nome = nome_completo ? nome_completo.split(' ')[0] : 'Colaborador'; 

  useEffect(() => {
    handleListData()
    handleListCarousel()

    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  const handleListData = () => {
    axios.get(`${backendIp}/api/events`)
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  };

  const handleListCarousel = () => {
    axios.get(`${backendIp}/api/carousel`)
      .then(response => {
        setCarouselImages(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar as imagens do carrossel:', error);
      });
  }

  const handleRamaisClick = () => {
    navigate('/ramais');
  };

  const handleSOSBeta = () => {
    window.open('https://sosbeta.lestetelecom.com.br/login?go=/', '_blank');
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <ul style={{ margin: '0px' }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="custom-dot">
      </div>
    ),
  };

  const formattedUsername = primeiro_nome === 'Comunicacao' ? 'Comunicação' : primeiro_nome;

  const greetingMessage = `${greeting}, ${formattedUsername ? formattedUsername : 'Colaborador'}`;


  return (
    <div className="main-content">
      <h2 className='text-boas'>
        {greetingMessage}
      </h2>
      <div className="banner">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img
                src={`${backendIp}/${image.image_url}`}
                alt={`Banner ${index + 1}`}
                className="banner-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div class="container-dashboard">
        <div class="events">
          <div>
            <h2 className='title-date'>Próximas datas</h2>
            {events.slice(0, 2).map(event => ( // Os dois primeiros eventos
              <div className={`event event${event.id}`} key={event.id}>
                <>
                  <div className="event-name" dangerouslySetInnerHTML={{ __html: event.nome_data.replace(/\n/g, '<br />') }}></div>
                  <div className="event-date"><strong>{event.data}</strong></div>
                </>
              </div>
            ))}
          </div>

          <div className='events-subsection'>
            {events.slice(2, 4).map(event => ( // Os dois últimos eventos
              <div className={`event event${event.id}`} key={event.id}>
                <>
                  <div className="event-name" dangerouslySetInnerHTML={{ __html: event.nome_data.replace(/\n/g, '<br />') }}></div>
                  <div className="event-date"><strong>{event.data}</strong></div>
                </>
              </div>
            ))}
          </div>
        </div>

        <div class="buttons">
          <button onClick={handleSOSBeta} class="button chamado-button">
            <div className='div-icon'>
              <span class="icon">
                <SupportAgentRoundedIcon style={{ color: 'white', fontSize: '85px' }} />
              </span>
            </div>
            <div className='div-text'>
              <span class="text">SOS <br></br><strong>Beta</strong></span>
            </div>
          </button>
          <button onClick={handleRamaisClick} class="button lista-button">
            <div className='div-icon'>
              <span class="icon">
                <CallRoundedIcon style={{ color: 'white', fontSize: '85px' }} />
              </span>
            </div>
            <div className='div-text'>
              <span class="text">Lista de <strong>Ramais</strong></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;