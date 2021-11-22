import {useState} from 'react';
import React from "react";
import {
    Link
} from "react-router-dom";
import PropTypes from "prop-types";
import CommentUnderPost from "./CommentUnderPost";
import dog from "../../download.jpg";
import {useDispatch, useSelector} from "react-redux";
import {addPost, likePost, replyPost} from "../../state/actions/posts";

function PostCard(props) {
    // TO-DO: Display edit or bin buttons only if user is authenticated
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isAuthor, setIsAuthor] = useState(false);
    const [showComments, setShowComments] = useState(false);

    // Reply
    const [showReplyForm, setShowReplayForm] = useState(false);
    const [replyText, setReplyText] = useState('');

    const dispatch = useDispatch();
    const {post} = props;
    const {comments} = props;

    const handleLike = (e) => {
        e.preventDefault();
        // Invoke redux action
        if (isAuthenticated) {
            dispatch(likePost(post.id));
        }
    };

    // Reply logic
    const handleReply = (e) => {
        e.preventDefault();
        dispatch(replyPost(replyText, post.id));
        console.log(replyText);
        // Clear form after submitting
        setReplyText('');
    };

    return (
        // Card
        <li className="flex flex-col">
            <div className="flex justify-center">
                <div className="w-1/2 bg-white shadow-md rounded-md">
                    {/* Header */}
                    <header className="flex justify-between px-4 py-1 bg-gray-300 rounded-t-md">
                        <div>
                            <div className="flex items-center">
                                <img src={dog} width="50px" alt="profile-picture"/>
                                <p className="ml-2 text-lg font-bold text-gray-700">{post.author}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="py-1 text-sm text-gray-500">Posted {post.pub_date} </p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </header>
                    {/* Text */}
                    <Link to={`/post/${post.id}`}>
                        <div className="px-4 py-4 text-gray-700">
                            <p>{post.text}</p>
                        </div>
                        <div className="flex px-4 mb-2 font-bold space-x-3">
                            {post.tags && post.tags.map(tag => (
                                <p className="text-sm text-gray-700" key={tag.id}>{tag.name}</p>
                            ))}
                        </div>
                    </Link>
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
                                <p>{post.likes_count} Likes</p>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="rgba(176, 196, 222)"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                                </svg>
                                <p>0 Comments</p>
                            </button>
                        </div>
                        <div className="flex items-center hover:text-gray-900 space-x-4">
                            {isAuthenticated &&
                            <button className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                                </svg>
                                <p className="px-1" onClick={() => setShowReplayForm(!showReplyForm)}>Reply</p>
                            </button>
                            }
                            <button className="flex items-center hover:text-gray-900"
                                    onClick={() => setShowComments(!showComments)}>
                                {showComments ?
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M8 7l4-4m0 0l4 4m-4-4v18"/>
                                        </svg>
                                        <p>Hide comments</p>
                                    </> :
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M16 17l-4 4m0 0l-4-4m4 4V3"/>
                                        </svg>
                                        <p>Show comments</p>
                                    </>
                                }
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
            {/* Reply form */}
            <div className="w-1/2 mx-auto">
                {showReplyForm &&
                <div className="flex flex-col w-3/4 ml-auto">
                    <div className="flex justify-end">
                        <div className="flex flex-col w-1/2 px-4 py-4 mb-4 bg-gray-200 shadow-md rounded-md">
                            <form onSubmit={e => handleReply(e)}>
                                <div className="mb-4">
                                    <input
                                        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none text-sm"
                                        id="text"
                                        type="text" placeholder="Text"
                                        onChange={e => setReplyText(e.target.value)}
                                        value={replyText}
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300 text-sm"
                                        type="submit">
                                        Reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                }
                {/* Comments for post*/}
                {showComments &&
                <div className="flex flex-col w-3/4 ml-auto">
                    {comments && comments.filter(comment => comment.post === post.id).map(comment => {
                        return <CommentUnderPost comment={comment} key={comment.id}/>;
                    })
                    }
                </div>
                }
            </div>
        </li>
    );
}


PostCard.propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    id: PropTypes.number
};


export default PostCard;
