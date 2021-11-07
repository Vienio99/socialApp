import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import PropTypes from "prop-types";
import CommentUnderPost from "./CommentUnderPost";
import dog from "../../download.jpg";

function PostCard(props) {
    const [showComments, setShowComments] = useState(false);

    const {post} = props;
    const {comments} = props;

    return (
        // Card
        <li className="flex flex-col">
            <div className="flex justify-center">
                <div className="bg-white rounded-md shadow-md w-1/2">
                    {/* Header */}
                    <header className="bg-gray-300 rounded-t-md py-1 px-4 flex justify-between">
                        <div>
                            <div className="flex items-center">
                                <img src={dog} width="50px" alt="profile-picture"/>
                                <p className="font-bold text-lg ml-2">{post.author}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 py-1">Posted {post.pub_date} </p>
                    </header>
                    {/* Text */}
                    <Link to={`/post/${post.id}`}>
                        <div className="px-4 py-4">
                            <p>{post.text}</p>
                        </div>
                        <div className="flex space-x-3 font-bold mb-2 px-4">
                            {post.tags && post.tags.map(tag => (
                                <p className="text-sm" key={tag.id}>{tag.name}</p>
                            ))}
                        </div>
                    </Link>
                    {/* Footer */}
                    <footer
                        className="bg-gray-100 py-1 px-4 text-sm text-gray-500 flex justify-between items-center rounded-b-md">
                        <div className="flex space-x-5">
                            <button className="flex items-center space-x-1 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="rgba(251, 191, 36)"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                                <p>{post.likes} Likes</p>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="rgba(176, 196, 222)"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                                </svg>
                                <p>0 Comments</p>
                            </button>
                        </div>
                        <button className="flex items-center hover:text-gray-900"
                                onClick={() => setShowComments(!showComments)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 17l-4 4m0 0l-4-4m4 4V3"/>
                            </svg>
                            <p>Show/hide comments</p>
                        </button>
                    </footer>

                </div>
            </div>
            {/* Comments for post*/}
            {showComments &&
            <div className="w-1/2 mx-auto">
                <div className="flex flex-col w-3/4 ml-auto">
                    {comments && comments.filter(comment => comment.post === post.id).map(comment => {
                        return <CommentUnderPost comment={comment} key={comment.id}/>;
                    })
                    }
                </div>
            </div>
            }
        </li>
    );
}


PostCard.propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array
};


export default PostCard;
