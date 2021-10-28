import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import PropTypes from "prop-types";
import PostCard from "./PostCard";

function PostDetail(props) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios(
                `http://127.0.0.1:8000/api/v1/post/${props.id}`
            );
            setPost(response.data);
        };
        fetchPost().finally();
    }, [props.id]);

    return (
        <div className="flex-grow">
            <PostCard post={post}/>
        </div>
    );
}


PostDetail.propTypes = {
    id: PropTypes.string
};

export default PostDetail;
