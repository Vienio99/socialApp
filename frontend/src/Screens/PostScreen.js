import React from "react";
import PostDetail from "../Components/Post/PostDetail";
import Main from "../Components/Main";
import PropTypes from "prop-types";


function PostScreen({ match }) {
    const { id } = match.params;
    return (
        <PostDetail id={id}/>
    );
}

PostScreen.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number
        })
    })
};

export default PostScreen;
