import {useEffect, useState} from 'react';
import React from "react";
import PropTypes from "prop-types";
import {getUser} from "../../state/actions/users";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader";
import PostList from "../Post/PostList";
import {getPosts} from "../../state/actions/posts";
import PostForm from "../Forms/PostForm";
import Post from "../Post/Post";
import PaginationBar from "../PaginationBar";
import {presets} from "tailwindcss/stubs/defaultConfig.stub";
import Comment from "../Post/Comment";

function UserDetail(props) {
    const {username} = props;
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users.user);
    const isLoadingUsers = useSelector((state) => state.users.isLoading);
    const isLoadingPosts = useSelector((state) => state.posts.isLoading);
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getUser(username));
    }, [dispatch, username]);

    return (
        <div className="flex-grow mb-10">
            {(isLoadingUsers && !userData.length) && <Loader/>}
            <div className="flex flex-col items-center space-y-5">
                <img src={userData.img} width="200px" alt="profile-picture"/>
                <p className="text-xl font-bold">{userData.username}</p>
                {/* Replace it with PostList maybe? */}
                {(isLoadingPosts && !posts.length) && <Loader/>}
                <ul className="flex flex-col w-4/5 space-y-10">
                    {posts.filter(post => post.author === username).map(post => {
                        return <Post key={post.id} post={post}/>;
                    })}
                </ul>
            </div>
        </div>
    );
}

UserDetail.propTypes = {
    username: PropTypes.string
};

export default UserDetail;
