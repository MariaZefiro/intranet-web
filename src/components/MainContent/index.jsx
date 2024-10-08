import React from 'react';
import Slider from 'react-slick';
import './style.css';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/ramais');
  };

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

  return (
    <div className="main-content">
      <h2 className='text-boas'>Boa tarde, Maria</h2>
      <div className="banner">
        <Slider {...settings}>
          <div>
            <img src="/images/banner.png" alt="Banner 1" className="banner-image" />
          </div>
          <div>
            <img src="/images/banner.png" alt="Banner 2" className="banner-image" />
          </div>
          <div>
            <img src="/images/banner.png" alt="Banner 3" className="banner-image" />
          </div>
        </Slider>
      </div>

      <div class="container-dashboard">

        <div class="events">
          <div>
            <h2 className='title-date'>Próximas datas</h2>
            <div class="event event1">
              <div class="event-name">Conectando <br></br>Rotas</div>
              <div class="event-date"><strong>27/09</strong></div>
            </div>

            <div class="event event2">
              <div class="event-name">Setembro <br></br>Amarelo</div>
              <div class="event-date"><strong>30/09</strong></div>
            </div>
          </div>
          
          <div className='events-subsection'>
            <div class="event event1">
              <div class="event-name">Outubro <br></br>Rosa</div>
              <div class="event-date"><strong>01/10</strong></div>
            </div>

            <div class="event event2">
              <div class="event-name">Final de <br></br>Ano</div>
              <div class="event-date"><strong>31/12</strong></div>
            </div>
          </div>
        </div>

        <div class="buttons">
          <button class="button chamado-button">
            <div className='div-icon'>
              <span class="icon">
                <SupportAgentRoundedIcon style={{ color: 'white', fontSize: '85px' }} />
              </span>
            </div>
            <div className='div-text'>
              <span class="text">Solicitar <strong>Chamado</strong></span>
            </div>
          </button>
          <button onClick={handleHomeClick} class="button lista-button">
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