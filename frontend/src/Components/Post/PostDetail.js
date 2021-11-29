import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import {useSelector} from "react-redux";

function PostDetail(props) {
    const posts = useSelector((state) => state.posts.posts);

    return (
        <div className="flex-grow">
            {/* Return proper post */}
            <Post post={posts.find(post => {
            return post.id === parseInt(props.id);
        })} />
        </div>
    );
}


PostDetail.propTypes = {
    id: PropTypes.string
};

export default PostDetail;
