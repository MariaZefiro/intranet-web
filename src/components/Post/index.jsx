import React, { useState } from 'react';
import './Post.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import config from '../../config';
import ConfirmationModal from '../ConfirmationModal';
import AlertAdmin from '../Alert/Alert';

const Post = ({ post, fetchPosts }) => {
    const { id, author, content, date, curtidas, avatar, postImages = [] } = post;
    const [likeCount, setLikeCount] = useState(curtidas || 0);
    const [hasLiked, setHasLiked] = useState(false); 
    const [showAllImages, setShowAllImages] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const username = localStorage.getItem('username');

    const handleShowAllImages = () => {
        setShowAllImages(true);
    };

    const handleHideAllImages = () => {
        setShowAllImages(false);
    };

    const handleLike = async () => {
        const backendIp = config.backend_ip;
        let newLikeCount = likeCount;

        if (hasLiked) {
            newLikeCount -= 1; 
            setHasLiked(false);
        } else {
            newLikeCount += 1; 
            setHasLiked(true);
        }

        setLikeCount(newLikeCount);
        // localStorage.setItem('isLiked', true);

        try {
            await axios.post(`${backendIp}/api/edit_posts`, {
                posts: [
                    {
                        id: id,
                        curtidas: newLikeCount
                    }
                ]
            });

            fetchPosts();
        } catch (error) {
            console.error('Erro ao curtir o post:', error);
            setLikeCount(likeCount);
            setHasLiked(hasLiked); 
        }
    };

    const confirmDelete = () => {
        setIsModalOpen(true);
    };

    const handleDeletePost = async () => {
        const backendIp = config.backend_ip;

        try {
            await axios.delete(`${backendIp}/api/delete_post/${id}`);
            fetchPosts();
            setIsModalOpen(false);
            setAlertMessage('Post excluído com sucesso!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            console.error('Erro ao excluir o post:', error);
        }
    };

    const handleImageClick = (img) => {
        setSelectedImage(img);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const renderImages = () => {
        if (!postImages || postImages.length === 0 || postImages.every(img => !img)) {
            return null;
        }

        if (showAllImages) {
            return (
                <div className="post-images">
                    {postImages.map((img, index) => (
                        <img
                            key={index}
                            src={`http://10.1.254.46:5000/${img}`}
                            alt={`Imagem do Post ${index + 1}`}
                            className="post-image"
                            onClick={() => handleImageClick(img)}
                        />
                    ))}
                    <div className="more-images" onClick={handleHideAllImages}>
                        Voltar à visualização normal
                    </div>
                </div>
            );
        }

        const imagesToShow = postImages.slice(0, 3);
        return (
            <div className="post-images">
                {imagesToShow.map((img, index) => (
                    <img
                        key={index}
                        src={`http://10.1.254.46:5000/${img}`}
                        alt={`Imagem do Post ${index + 1}`}
                        className="post-image"
                        onClick={() => handleImageClick(img)}
                    />
                ))}
                {postImages.length > 3 && (
                    <div className="more-images" onClick={handleShowAllImages}>
                        +{postImages.length - 3}
                    </div>
                )}
            </div>
        );
    };

    const linkify = (text) => {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlPattern, '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>');
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const formattedUsername = author === 'Comunicacao' ? 'Comunicação' : author;

    return (
        <div className="post">
            <div className="post-header">
                <div style={{ display: 'flex' }}>
                    <img src={`http://10.1.254.46:5000/${avatar}`} alt={`${author}`} className="post-avatar" />
                    <div style={{position:'relative', top:'-5px'}}>
                        <h3 className="post-author">{formattedUsername}</h3>
                        <p className="post-date">{date}</p>
                    </div>
                </div>
                <div>
                    {username === author && (
                        <DeleteIcon
                            style={{ color: '#009373', cursor: 'pointer' }}
                            onClick={confirmDelete}
                        />
                    )}
                </div>
            </div>
            <p
                className="post-content"
                dangerouslySetInnerHTML={{ __html: linkify(content.replace(/\n/g, '<br/>')) }}
            ></p>
            {renderImages()}
            <div className="post-like-section">
                <ThumbUpIcon
                    style={{ padding: '10px', color: hasLiked ? '#009373' : '#009373', cursor: 'pointer' }} 
                    onClick={handleLike}
                />
                <span className="like-count">{likeCount} curtidas {hasLiked && <span style={{fontWeight:'normal'}} className="like-alert">- Você já curtiu este post!</span>} </span>
            </div>

            {selectedImage && (
                <div className="modal-image-post" onClick={handleCloseModal}>
                    <span className="close-modal-image-post" onClick={handleCloseModal}>&times;</span>
                    <img className="modal-content-image-post" src={`http://10.1.254.46:5000/${selectedImage}`} alt="Imagem grande" />
                </div>
            )}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeletePost}
                message={'Tem certeza que deseja excluir o Post?'}
            />
            <AlertAdmin
                open={alertOpen}
                message={alertMessage}
                onClose={handleAlertClose}
                severity={alertSeverity}
            />
        </div>
    );
};

export default Post;
