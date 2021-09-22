import React from "react";
import PostDetail from "../Components/PostDetail";
import Main from "../Components/Main";

//TO-DO - define prop types and read about it

// eslint-disable-next-line react/prop-types
function PostScreen({ match }) {
    return (
        <React.Fragment>
            {/* eslint-disable-next-line react/prop-types */}
            <Main content={<PostDetail id={match.params.id}/>} />
        </React.Fragment>
    );
}

export default PostScreen;
