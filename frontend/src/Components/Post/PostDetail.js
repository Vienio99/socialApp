import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import PropTypes from "prop-types";
import PostCard from "./PostCard";
import Loader from "../Loader";

function PostDetail(props) {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            const response = await axios(
                `http://127.0.0.1:8000/api/v1/post/${props.id}`
            );
            setPost(response.data);
            setIsLoading(false);
        };

        const fetchComments = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/comment/'
            );
            setComments(response.data);
        };
        fetchPost();
        fetchComments();
    }, [props.id]);

    return (
        <div className="flex-grow">
            {isLoading && <Loader/>}
            <PostCard post={post} comments={comments}/>
        </div>
    );
}


PostDetail.propTypes = {
    id: PropTypes.string
};

export default PostDetail;


// const [post, setPost] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// const [comments, setComments] = useState([]);
//
// useEffect(() => {
//     const fetchPost = async () => {
//         const response = await axios(
//             `http://127.0.0.1:8000/api/v1/post/${post.id}`
//         );
//         setPost(response.data);
//         setIsLoading(false);
//     };
//
//     const fetchComments = async() => {
//         const response = await axios(
//             'http://127.0.0.1:8000/api/v1/comment/'
//         );
//         setComments(response.data);
//     };
//     fetchPost();
//     fetchComments();
// }, [post.id]);