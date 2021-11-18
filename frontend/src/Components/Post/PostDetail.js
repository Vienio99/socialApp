import {useEffect, useState} from 'react';
import React from "react";
import PropTypes from "prop-types";
import PostCard from "./PostCard";
import Loader from "../Loader";
import {useSelector} from "react-redux";

function PostDetail(props) {
    const posts = useSelector((state) => state.posts.posts);
    const comments = useSelector((state) => state.posts.comments);
    const [isLoading, setIsLoading] = useState(false);

    const [post, setPost] = useState({});

    useEffect(() => {
        setIsLoading(true);
        setPost(posts.find(post => {
            return post.id === parseInt(props.id);
        }));
        setIsLoading(false);
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
