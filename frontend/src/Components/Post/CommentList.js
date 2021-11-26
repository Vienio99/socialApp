import React from "react";
import {useSelector} from "react-redux";
import Comment from "./Comment";
import PropTypes from "prop-types";

function CommentList(props) {
    const { post } = props;
    const comments = useSelector((state) => state.posts.comments);
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <div className="flex flex-col w-3/4 ml-auto space-y-3">
            {comments && comments.filter(comment => comment.post === post.id).map(comment => {
                return <Comment comment={comment} key={comment.id}/>;
            })
            }
        </div>
    );
}

export default CommentList;

CommentList.propTypes = {
    post: PropTypes.object,
    id: PropTypes.number
};