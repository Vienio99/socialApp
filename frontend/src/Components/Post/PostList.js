import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PostCard from "./PostCard";


function PostList(props) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/post/'
            );
            setPosts(response.data);
        };

        const fetchComments = async() => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/comment/'
            );
            setComments(response.data);
        };
        fetchPosts();
        fetchComments();
    }, []);
    console.log("posts" + posts);
    return (
        <div className="flex flex-col space-y-10">
            {posts.map(post => (
                // eslint-disable-next-line react/jsx-key
                <PostCard post={post} />
            ))}
        </div>
    );
}
export default PostList;
