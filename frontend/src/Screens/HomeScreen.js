import React from "react";
import Main from "../Components/Main";
import PostForm from "../Components/Post/PostForm";
import PostList from "../Components/Post/PostList";

function HomeScreen() {

    const content = <React.Fragment>
                        <PostForm/>
                        <PostList/>
                    </React.Fragment>;

    return (
        <React.Fragment>
            <div>okokokok</div>
        </React.Fragment>
    );
}

export default HomeScreen;
