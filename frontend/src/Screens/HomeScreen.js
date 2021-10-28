import React from "react";
import Main from "../Components/Main";
import PostForm from "../Components/Forms/PostForm";
import PostList from "../Components/Post/PostList";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PostCard from "../Components/Post/PostCard";

function HomeScreen() {

    // const content = <React.Fragment>
    //                     <PostForm/>
    //                     <PostList/>
    //                 </React.Fragment>;

    return (
        <PostList />
);
}

export default HomeScreen;
