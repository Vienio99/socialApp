import React from "react";
import PropTypes from "prop-types";
import TagDetail from "../Components/Tags/TagDetail";


function TagScreen({ match }) {
    const { name } = match.params;
    return (
        <TagDetail name={name}/>
    );
}

TagScreen.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            name: PropTypes.string
        })
    })
};

export default TagScreen;
