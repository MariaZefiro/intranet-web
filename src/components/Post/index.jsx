import React from 'react';
import './Post.css';

const Post = ({ post }) => {
    const { author, content, date, role, avatar, postImage } = post;

    return (
        <div className={`post ${role}`}>
            <div className="post-header">
                <img src={avatar} alt={`${author}`} className="post-avatar" />
                <div>
                    <h3 className="post-author">{author}</h3>
                    <p className="post-date">{date}</p>
                </div>
            </div>
            <p className="post-content">{content}</p>
            {postImage && (
                <div className="post-image-container">
                    <img src={postImage} alt="Postagem" className="post-image" />
                </div>
            )}
        </div>
    );
};

export default Post;
