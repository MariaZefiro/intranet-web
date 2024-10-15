import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './style.css';
import Slider from 'react-slick';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';
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

const AdminPage = () => {
    const backendIp = config.backend_ip;
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [carouselImages, setCarouselImages] = useState([]);
    const [avisos, setAvisos] = useState([]);
    const [acessoRapido, setAcessoRapido] = useState([]);
    const [newAviso, setNewAviso] = useState('');
    const [aplicativos, setAplicativos] = useState([]);
    const [newIconName, setNewIconName] = useState('');
    const [newIconLink, setNewIconLink] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

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

    useEffect(() => {
        handleListData();
        handleListCarousel();
        handleListAvisos();
        handleListAcessoRapido();
        handleAplicativos();
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

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (id, field, value) => {
        setEvents(events.map(event =>
            event.id === id ? { ...event, [field]: value } : event
        ));
    };

    const handleSave = () => {
        // Salvar eventos
        axios.post(`${backendIp}/api/save-events`, events)
            .then(response => {
                console.log('Eventos salvos');
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao salvar eventos.');
            });

        // Salvar avisos
        axios.post(`${backendIp}/api/save-avisos`, avisos)
            .then(response => {
                console.log('Avisos salvos');
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao salvar avisos.');
            });

        // Salvar acesso rápido
        axios.post(`${backendIp}/api/save-acesso`, acessoRapido)
            .then(response => {
                console.log('Acesso Rápido salvo');
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao salvar acesso rápido.');
            });

        alert('Todas as alterações foram salvas com sucesso!');
        setIsEditing(false);
        // Recarregar dados
        handleListData();
        handleListAvisos();
        handleListAcessoRapido();
    };

    const handleImageUpload = (event) => {
        setImageFile(event.target.files[0]); // Captura o arquivo de imagem
    };

    const handleImageUpload2 = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('nome', newIconName);
        formData.append('link', newIconLink);

        try {
            await axios.post(`${backendIp}/api/add_icon`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleAplicativos();
            setNewIconName('');
            setNewIconLink('');
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleUploadSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', imageFile);

        axios.post(`${backendIp}/api/carousel`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert('Imagem adicionada ao carrossel com sucesso!');
                setImageFile(null); // Limpa o arquivo selecionado
                handleListCarousel()
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao adicionar a imagem ao carrossel.');
            });
    };

    const handleDeleteImage = (id) => {
        axios.delete(`${backendIp}/api/delete_carousel/${id}`)
            .then(response => {
                alert('Imagem removida com sucesso!');
                handleListCarousel();
            })
            .catch(error => {
                console.error('Erro ao remover a imagem do carrossel:', error);
                alert('Erro ao remover a imagem.');
            });
    };

    const handleListAvisos = () => {
        axios.get(`${backendIp}/api/list_avisos`)
            .then(response => setAvisos(response.data))
            .catch(error => console.error(error));
    };

    const handleAvisoChange = (id, value) => {
        setAvisos(avisos.map(aviso =>
            aviso.id === id ? { ...aviso, titulo: value } : aviso
        ));
    };

    const handleListAcessoRapido = () => {
        axios.get(`${backendIp}/api/acesso_rapido`)
            .then(response => setAcessoRapido(response.data))
            .catch(error => console.error(error));
    };

    const handleAddAviso = async () => {
        if (!newAviso.trim()) return;

        const response = await fetch(`${backendIp}/api/add-aviso`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo: newAviso }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            handleListAvisos();
            setNewAviso('');
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    };

    const handleDeleteAviso = (id) => {
        axios.delete(`${backendIp}/api/delete_aviso/${id}`)
            .then(response => {
                alert('Aviso removido com sucesso!');
                handleListAvisos();
            })
            .catch(error => {
                console.error('Erro ao remover o aviso:', error);
                alert('Erro ao remover o aviso.');
            });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendIp}/api/delete_icon/${id}`);
            handleAplicativos();
        } catch (error) {
            console.error("Erro ao remover ícone:", error);
        }
    };

    const iconMapping = {
        'suporte': <SupportAgentRoundedIcon />,
        'fone': <HeadphonesRoundedIcon />,
        'anúncio': <AnnouncementRoundedIcon />,
        'telephone': <CallRoundedIcon />,
        'aviso': <WarningAmberIcon />,
        'excluir': <DeleteIcon />,
        'person': <PersonRoundedIcon />,
        'home': <HomeIcon />,
        'sobre': <InfoIcon />,
        'time': <GroupsIcon />,
    };

    return (
        <div>
            <Header />
            <div className='container-text-admin'>
                <h2><WarningAmberIcon style={{ color: '#009373', fontSize: '30px', padding: '0px 5px', position: 'relative', top: '5px' }} />Página de Administração<WarningAmberIcon style={{ color: '#009373', fontSize: '30px', padding: '0px 5px', position: 'relative', top: '5px' }} /></h2>
                <p>Aqui você pode gerenciar as configurações do sistema.</p>
                <p style={{ margin: '0', color: 'red' }}>Todas as alterações feitas aqui serão aplicadas permanentemente no sistema.</p>
                <button
                    onClick={isEditing ? handleSave : handleEditToggle}
                    className={'button-edit'}
                    style={{ marginLeft: '20px' }}
                >
                    {isEditing ? 'Salvar Alterações' : 'Editar Página'}
                </button>
            </div>
            <div className='content-admin'>
                <div className="admin-page">
                    <div className="main-content" style={{ padding: '20px 80px' }}>
                        {isEditing ? (
                            <div className="upload-section" style={{ marginTop: '40px' }}>
                                <h3>Adicionar Imagem ao Carrossel</h3>
                                <form onSubmit={handleUploadSubmit}>
                                    <div className='send_file'>
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            required
                                        />
                                        <button type="submit" className="button-image" style={{ marginTop: '10px' }}>Adicionar Imagem</button>
                                    </div>
                                </form>
                                <h3>Pré-visualização das Imagens do Carrossel</h3>
                                <div className="image-preview-container">
                                    {carouselImages.map((image, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img
                                                src={`${backendIp}/${image.image_url}`}
                                                alt={`Carrossel ${index + 1}`}
                                                className="image-preview"
                                            />
                                            <DeleteIcon onClick={() => handleDeleteImage(image.id)} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'red', fontSize: '22px' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (<p></p>)}
                        <div className="banner2">
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
                            <div className="events2" style={{ display: 'flex' }}>
                                <div className="event-column-edit" style={{ flex: '1' }}>
                                    <h2 className='title-date'>Próximas datas</h2>
                                    {events.slice(0, 2).map(event => ( // Os dois primeiros eventos
                                        <div className={`event event${event.id}`} key={event.id}>
                                            {isEditing ? (
                                                <>
                                                    <textarea
                                                        value={event.nome_data}
                                                        onChange={(e) => handleChange(event.id, 'nome_data', e.target.value)}
                                                        rows={3}
                                                        style={{ width: '100%', resize: 'vertical', border: '1px solid #ccc', borderRadius: '5px', maxHeight: '44px', fontFamily: 'inherit' }}

                                                    />
                                                    <input
                                                        type="text"
                                                        value={event.data}
                                                        onChange={(e) => handleChange(event.id, 'data', e.target.value)}
                                                        style={{ width: '100%', marginTop: '10px' }}
                                                        className='textarea'
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="event-name" dangerouslySetInnerHTML={{ __html: event.nome_data.replace(/\n/g, '<br />') }}></div>
                                                    <div className="event-date"><strong>{event.data}</strong></div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="event-column-edit2" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                                    {events.slice(2, 4).map(event => ( // Os dois últimos eventos
                                        <div className={`event event${event.id}`} key={event.id}>
                                            {isEditing ? (
                                                <>
                                                    <textarea
                                                        value={event.nome_data}
                                                        onChange={(e) => handleChange(event.id, 'nome_data', e.target.value)}
                                                        rows={3}
                                                        style={{ width: '100%', resize: 'vertical' }}
                                                        className='textarea'
                                                    />
                                                    <input
                                                        type="text"
                                                        value={event.data}
                                                        onChange={(e) => handleChange(event.id, 'data', e.target.value)}
                                                        style={{ width: '100%', marginTop: '10px' }}
                                                        className='textarea'
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="event-name" dangerouslySetInnerHTML={{ __html: event.nome_data.replace(/\n/g, '<br />') }}></div>
                                                    <div className="event-date"><strong>{event.data}</strong></div>
                                                </>
                                            )}
                                        </div>
                                    ))}
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
                                <button class="button lista-button">
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
                </div>
                <div className='sidebar-admin'>
                    <div style={{ width: '100% !important' }} className={`sidebar2 ${isEditing ? 'sidebar-editing' : ''}`}>
                        <div className="apps-section">
                            <h3>Meus Aplicativos</h3>
                            <div className="apps">
                                {isEditing ? (
                                    <>
                                        <div className="icon-options">
                                            {aplicativos.map((app) => (
                                                <div
                                                    key={app.id}
                                                    className="icon-item"
                                                    style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent:'space-between' }}
                                                >
                                                    <div style={{display:'flex', alignItems:'center'}}>
                                                        <img
                                                            src={`${backendIp}/${app.icone_url}`}
                                                            alt={app.nome}
                                                            style={{ width: '30px', marginRight: '10px' }}
                                                        />
                                                        {app.nome}
                                                    </div>
                                                    <div>
                                                        <RemoveIcon style={{ color: 'red' }} onClick={() => handleDelete(app.id)} />
                                                    </div>
                                                </div>
                                            ))}

                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    value={newIconName}
                                                    onChange={(e) => setNewIconName(e.target.value)}
                                                    placeholder="Nome do Ícone"
                                                    style={{ width: '80%', marginBottom: '10px' }}
                                                    className='textarea'
                                                />
                                                <input
                                                    value={newIconLink}
                                                    onChange={(e) => setNewIconLink(e.target.value)}
                                                    placeholder="Link do Ícone"
                                                    style={{ width: '80%', marginBottom: '10px' }}
                                                    className='textarea'
                                                />
                                                <p>Ícone:</p>
                                                <input
                                                    type="file"
                                                    onChange={handleImageUpload2}
                                                    accept="image/*"
                                                    required
                                                />
                                                <button type='submit' className='button-image'>Adicionar Ícone</button>
                                            </form>
                                        </div>
                                    </>
                                ) : (
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
                                                                    style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center' }}
                                                                >
                                                                    <img
                                                                        src={`${backendIp}/${app.icone_url}`}
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
                                )}
                            </div>
                        </div>

                        <div className="quick-access">
                            <h3>Acesso Rápido</h3>
                            <ul>
                                {acessoRapido.length > 0 ? (
                                    acessoRapido.map(acesso => (
                                        <li key={acesso.id}>
                                            <div className="app-icon2">
                                                {iconMapping[acesso.tipo]}
                                            </div>
                                            {acesso.nome}
                                        </li>
                                    ))
                                ) : (
                                    <p>Não há acessos rápidos no momento.</p>
                                )
                                }
                            </ul>
                        </div>

                        <div className="news-and-events">
                            <h3>Notícias e Avisos</h3>
                            {isEditing ? (
                                <>
                                    {avisos.map(aviso => (
                                        <div key={aviso.id} className="news-item" style={{ marginBottom: '10px' }}>
                                            <div className="news-icon"><AnnouncementRoundedIcon style={{ color: '#009373', fontSize: '30px' }} /></div>
                                            <textarea
                                                type="text"
                                                value={aviso.titulo}
                                                onChange={(e) => handleAvisoChange(aviso.id, e.target.value)}
                                                style={{ width: '80%' }}
                                                className='textarea'
                                            />
                                            <DeleteIcon
                                                onClick={() => handleDeleteAviso(aviso.id)}
                                                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <textarea
                                            value={newAviso}
                                            onChange={(e) => setNewAviso(e.target.value)}
                                            placeholder="Adicionar novo aviso..."
                                            style={{ width: '80%' }}
                                            className='textarea'
                                        />
                                        <button className='button-image' onClick={handleAddAviso}>Adicionar Aviso</button>
                                    </div>
                                </>
                            ) : (
                                avisos.length > 0 ? (
                                    avisos.map(aviso => (
                                        <div key={aviso.id} className="news-item">
                                            <div className="news-icon"><AnnouncementRoundedIcon style={{ color: '#009373', fontSize: '30px' }} /></div>
                                            <div className="news-info">
                                                <p>{aviso.titulo}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Não há avisos no momento.</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
