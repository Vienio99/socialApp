import {useEffect, useState} from 'react';
import React from "react";
import PropTypes from "prop-types";
import PostCard from "./PostCard";
import {useSelector} from "react-redux";

function PostDetail(props) {
    const posts = useSelector((state) => state.posts.posts);
    const comments = useSelector((state) => state.posts.comments);

    const [post, setPost] = useState({});

    useEffect(() => {
        // Find correct post to display
        setPost(posts.find(post => {
            return post.id === parseInt(props.id);
        }));
        // TO-DO: change it
        // eslint-disable-next-line
    }, [props.id]);

    return (
        <div className="flex-grow">
            <PostCard post={post} comments={comments}/>
        </div>
    );
}


PostDetail.propTypes = {
    id: PropTypes.string
};

export default PostDetail;
