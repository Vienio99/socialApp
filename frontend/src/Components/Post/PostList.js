import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import PostCard from "./PostCard";
import Loader from "../Loader";
import PostForm from "../Forms/PostForm";
import PaginationBar from "../PaginationBar";
import axiosInstance from "../../axios";
import {getPosts} from "../../state/actions/posts";
import {useSelector} from "react-redux";


// TO-DO: when there is 404 error, forward user to 404 page

function PostList() {
    const posts = useSelector((state) => state.posts.posts);
    const comments = useSelector((state) => state.posts.comments);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await getPosts();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col flex-grow space-y-10">
            <PostForm/>
            {isLoading && <Loader/>}
            <ul className="flex flex-col space-y-10">
                {currentPosts.map(post => (
                    <PostCard post={post} comments={comments} key={post.id}/>
                ))}
            </ul>
            <PaginationBar postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}
                           currentPage={currentPage}/>
        </div>
    );
}

export default PostList;