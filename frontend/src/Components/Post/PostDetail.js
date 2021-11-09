import {useEffect, useState} from 'react';
import React from "react";
import PropTypes from "prop-types";
import PostCard from "./PostCard";
import Loader from "../Loader";
import axiosInstance from "../../axios";

function PostDetail(props) {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await axiosInstance.get(`post/${props.id}`);
            const response2 = await axiosInstance.get('comment/');
            setPost(response.data);
            setComments(response2.data);
            setIsLoading(false);
        };
        fetchData();
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