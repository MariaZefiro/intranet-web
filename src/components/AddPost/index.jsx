import React, { useState } from 'react';
import axios from 'axios';
import './AddPost.css';
import config from '../../config';

const AddPost = ({ fetchPosts, onClose }) => {
    const backendIp = config.backend_ip;
    const username = localStorage.getItem('username');
    const [files, setFiles] = useState([]);
    const [conteudo, setConteudo] = useState('');

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('nome', username);
        formData.append('conteudo', conteudo);
    
        try {
            await axios.post(`${backendIp}/api/add_post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setConteudo('');
            fetchPosts();
            onClose();
        } catch (error) {
        }
    };
    

    return (
        <div className="add-panel">
            <h2>Criar Novo Post</h2>
            <form onSubmit={handleSubmit} className="add-post-form">
                <textarea
                    className="post-textarea"
                    placeholder="Digite o conteúdo aqui..."
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    required
                />
                <p style={{color:'gray', fontSize:'15px'}}>* Para adicionar várias imagens, selecione todas de uma vez segurando a tecla 'Ctrl' durante a seleção.</p>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="file-input"
                    multiple 
                />
                <div className="image-preview2">
                    {files.map((file, index) => (
                        <img 
                            key={index} 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${index}`} 
                            className="preview-image"
                        />
                    ))}
                </div>
                <button type="submit" className="add-post-button">
                    Adicionar Postagem
                </button>
            </form>
        </div>
    );
};

export default AddPost;
