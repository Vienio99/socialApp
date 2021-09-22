import React from "react";
import Main from "../Components/Main";
import PostForm from "../Components/PostForm";
import PostList from "../Components/PostList";

function HomeScreen() {

    const content = <React.Fragment>
                        <PostForm/>
                        <PostList/>
                    </React.Fragment>;

    return (
        <React.Fragment>
            <Main content={content}/>
        </React.Fragment>
    );
}

export default HomeScreen;
