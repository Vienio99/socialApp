import React from "react";
import PostDetail from "../Components/PostDetail";
import Main from "../Components/Main";
import PropTypes from "prop-types";


function PostScreen({ match }) {
    const { id } = match.params;
    return (
        <React.Fragment>
            <Main content={<PostDetail id={id}/>} />
        </React.Fragment>
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
