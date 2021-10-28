import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import PropTypes from "prop-types";
import PostCard from "./PostCard";
import Loading from "../Loading";

function PostDetail(props) {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios(
                `http://127.0.0.1:8000/api/v1/post/${props.id}`
            );
            setPost(response.data);
            setIsLoading(false);
        };
        fetchPost();
    }, [props.id]);

    return (
        <div className="flex-grow">
            {isLoading && <Loading />}
            <PostCard post={post}/>
        </div>
    );
}


PostDetail.propTypes = {
    id: PropTypes.string
};

export default PostDetail;
