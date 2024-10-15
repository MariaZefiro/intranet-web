import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Timeline from '../Timeline';
import AddPost from '../AddPost';
import './Team.css';

const Team = () => {
    const isLogged = localStorage.getItem('isLogged');

    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'TI',
            content: 'Parabéns à equipe pelo excelente trabalho neste trimestre!',
            date: '11/10/2024',
            role: 'gerente',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            postImage: 'https://via.placeholder.com/300x300',
        },
        {
            id: 2,
            author: 'Engenharia',
            content: 'Concluímos o projeto Alfa com sucesso!',
            date: '10/10/2024',
            role: 'funcionario',
            avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        },
        {
            id: 3,
            author: 'Recursos Humanos',
            content: 'Iniciando o treinamento para o novo software.',
            date: '09/10/2024',
            role: 'funcionario',
            avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
        },
        {
            id: 4,
            author: 'CGR',
            content: 'Vamos organizar um evento de integração para a equipe.',
            date: '08/10/2024',
            role: 'gerente',
            avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
            postImage: 'https://via.placeholder.com/300x300',
        },
    ]);

    useEffect(() => {

    }, []);

    return (
        <div className="team">
            <Header />
            <div className="timeline-container">
                <h2 className="timeline-title">Atualizações dos Times</h2>
                <Timeline posts={posts} />
                {isLogged && <AddPost />}
            </div>
        </div>
    );
};

export default Team;
