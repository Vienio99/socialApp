import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import PostCard from "./PostCard";
import Loader from "../Loader";
import PostForm from "../Forms/PostForm";
import PaginationBar from "../PaginationBar";


function PostList(props) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        // let didCancel = false;
        const fetchData = async () => {
            setIsLoading(true);
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/post/'
            );
            const response2 = await axios(
                'http://127.0.0.1:8000/api/v1/comment/'
            );
            setPosts(response.data);
            setComments(response2.data);
            setIsLoading(false);
        };

        fetchData();


        // return () => {
        //     didCancel = true;
        // };
    }, []);

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col space-y-10 flex-grow">
            <PostForm/>
            {isLoading && <Loader/>}
            {currentPosts.map(post => (
                <PostCard post={post} comments={comments} key={post.id}/>
            ))}
            <PaginationBar postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}
                           currentPage={currentPage}/>
        </div>
    );
}

export default PostList;
