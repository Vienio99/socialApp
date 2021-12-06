import {useEffect, useState} from 'react';
import React from "react";
import Post from "./Post";
import Loader from "../Loader";
import PostForm from "../Forms/PostForm";
import PaginationBar from "../PaginationBar";
import {getPosts} from "../../state/actions/posts";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_ERRORS, CLEAR_MESSAGE} from "../../state/actions/types";
import {useAlert} from "react-alert";


// TO-DO: when there is 404 error, forward user to 404 page

function PostList() {
    const posts = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.isLoading);
    const error = useSelector((state) => state.errors.message.detail);
    const alert = useAlert();
    const message = useSelector((state) => state.messages.message);
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    // Pagination mechanism
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getPosts());

        // TO-DO: fix problems with fetching data when user is logged in
        if (error) {
            alert.show(error, {type: 'error'});
            // Clear errors after displaying them because otherwise it will pop up again after routing back to Signup Form
            dispatch({type: CLEAR_ERRORS});
        }

        console.log('message' + message);
        if (message !== '') {
            alert.show(message, {type: 'success'});
            dispatch({type: CLEAR_MESSAGE});
        }
    }, [alert, dispatch, error, message]);

    return (
        <div className="flex flex-col flex-grow space-y-10">
            <PostForm/>
            {(isLoading && !posts.length) && <Loader/>}
            <ul className="flex flex-col space-y-10">
                {currentPosts.map(post => (
                    <Post key={post.id}
                          post={post}
                    />
                ))}
            </ul>
            <PaginationBar postsPerPage={postsPerPage}
                           totalPosts={posts.length}
                           paginate={paginate}
                           currentPage={currentPage}/>
        </div>
    );
}

export default PostList;