import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import dog from "../../download.jpg";
import {deleteComment, likeComment} from "../../state/actions/comments";
import {useDispatch, useSelector} from "react-redux";

function Comment(props) {
    const {comment} = props;
    const currentUser = useSelector((state) => state.auth.username);
    // TO-DO: Display edit or bin buttons only if user is author
    const [isAuthor, setIsAuthor] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (comment.author === currentUser) {
            setIsAuthor(true);
        }
    }, [currentUser, comment.author]);

    // Like if user is authenticated
    const handleLike = (e) => {
        e.preventDefault();
        // Invoke redux action
        dispatch(likeComment(comment.id));
    };

    // const handleEdit = (e) => {
    //     e.preventDefault();
    //     dispatch(editComment(comment.id));
    // };

    // Delete comment
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteComment(comment.id));
        console.log('comment deleted ' + comment.id);
    };

    return (
        // Card
        <div className="flex justify-center">
            <div className="w-full bg-white shadow-md rounded-b-md">
                {/* Header */}
                <header className="flex items-center justify-between px-4 py-2 bg-gray-200">
                    <div>
                        <div className="flex items-center">
                            <img src={dog} width="30px" alt=""/>
                            <p className="ml-2 text-sm font-bold text-gray-700">{comment.author}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="py-1 text-sm text-gray-500">Posted {comment.pub_date} </p>
                        {isAuthor &&
                        <div>
                            <button title="Edit post">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                </svg>
                            </button>
                            <button title="Delete post" onClick={e => handleDelete(e)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </button>
                        </div>
                        }
                    </div>
                </header>
                {/* Text */}
                <div className="px-4 py-2 text-sm text-gray-700">
                    <p>{comment.text}</p>
                </div>
                {/* Footer */}
                <footer
                    className="flex items-center justify-between px-4 py-1 text-sm text-gray-500 bg-gray-100 rounded-b-md">
                    <div className="flex space-x-5">
                        <button className="flex items-center space-x-1 hover:text-gray-900" onClick={handleLike}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="rgba(251, 191, 36)"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                            <p>{comment.likes_count} Likes</p>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}


Comment.propTypes = {
    comment: PropTypes.object
};


export default Comment;


