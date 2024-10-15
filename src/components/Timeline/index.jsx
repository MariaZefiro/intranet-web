import React from 'react';
import Post from '../Post';
import './Timeline.css';

const Timeline = ({ posts }) => {
    return (
        <div className="timeline">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Timeline;
