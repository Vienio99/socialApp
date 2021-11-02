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
import Loading from "../Loading";
import PostForm from "../Forms/PostForm";


function PostList(props) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/post/'
            );
            setPosts(response.data);
            setIsLoading(false);
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
    return (
        <div className="flex flex-col space-y-10 flex-grow">
            <PostForm />
            {isLoading && <Loading />}
            {posts.map(post => (
                <PostCard post={post} comments={comments} key={post.id}/>
            ))}
        </div>
    );
}
export default PostList;
