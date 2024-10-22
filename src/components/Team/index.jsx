import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Timeline from '../Timeline';
import AddPost from '../AddPost';
import Modal from '../Modal';
import config from '../../config';
import './Team.css';
import Loader from '../Loader';

const Team = () => {
    const isLogged = localStorage.getItem('isLogged');
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    const fetchPosts = async () => {
        const backendIp = config.backend_ip;
        try {
            setIsLoading(true);  
            const response = await axios.get(`${backendIp}/api/list_post`);
            setPosts(response.data);
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="team">
            <Header />
            <div className="timeline-container">
                <div className='add-post-title'>
                    <h2 className="timeline-title">Atualizações dos Times</h2>
                    {isLogged && (
                        <>
                            <button onClick={() => setIsModalOpen(true)} className="add-post-button">Adicionar Novo Post</button>
                            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <AddPost 
                                    onClose={() => setIsModalOpen(false)} 
                                    fetchPosts={fetchPosts} 
                                    setIsLoading={setIsLoading}
                                />
                            </Modal>
                        </>
                    )}
                </div>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <Timeline posts={posts} fetchPosts={fetchPosts} />
                )}
            </div>
        </div>
    );
};

export default Team;
