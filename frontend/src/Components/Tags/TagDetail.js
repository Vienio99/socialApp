import {useEffect, useState} from 'react';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../state/actions/posts";
import Post from '../Post/Post';
import PropTypes from "prop-types";
import Loader from "../Loader";


function TagDetail(props) {
    // Tag name
    const {name} = props;
    const dispatch = useDispatch();
    const isLoadingPosts = useSelector((state) => state.posts.isLoading);
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className="flex-grow mb-10">
            <div className="flex flex-col items-center space-y-5">
                <p className="text-4xl font-bold">#{name}</p>
                 {/*Replace it with PostList maybe? */}
                {(isLoadingPosts && !posts.length) && <Loader/>}
                <ul className="flex flex-col w-4/5 space-y-10">
                    {posts.filter(post => post.tags.some(tag => tag.name === `#${name}`)).map(post => {
                        return <Post key={post.id} post={post}/>;
                    })}
                </ul>
            </div>
        </div>
    );
}

TagDetail.propTypes = {
    name: PropTypes.string
};

export default TagDetail;
