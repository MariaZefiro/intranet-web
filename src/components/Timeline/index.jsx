import React from 'react';
import Post from '../Post';
import './Timeline.css';

const Timeline = ({ posts, fetchPosts }) => {
    return (
        <div className="timeline">
            {posts.map((post) => (
                <Post key={post.id} post={post} fetchPosts={fetchPosts}/>
            ))}
        </div>
    );
};

export default Timeline;
