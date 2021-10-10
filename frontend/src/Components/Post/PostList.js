import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function PostList(props) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/post/'
            );
            setPosts(response.data);
        };

        const fetchComments = async() => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/comment/'
            );
            setComments(response.data);
        };
        fetchPosts();
        fetchComments();
    }, []);

    return (
        <React.Fragment>
            {posts.map(post => (
                <div className="card social-card share share-other col1" data-social="item" key={post.id}>
                    <div data-toggle="tooltip" title="Label" data-container="body">
                    </div>
                    <div className="card-content">
                        {/*<ul className="buttons ">*/}
                        {/*    <li>*/}
                        {/*        <a href="#" className="d-flex"><i className="pg-icon">expand</i>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <a href="#" className="d-flex"><i className="pg-icon">heart_outline</i>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                        {/*<img alt="Quote" src="../assets/img/social/quote.jpg"/>*/}
                    </div>
                    <Link to={`/post/${post.id}`}>
                        <div className="card-description">
                            <p>{post.text}</p>
                        </div>
                        <div className="card-footer clearfix">
                            <div className="time">Posted {post.pub_date}</div>
                            <ul className="reactions">
                                <li><a href="#" className="d-flex align-items-center">{post.likes} <i
                                    className="pg-icon">like</i></a>
                                </li>
                                <li><a href="#" className="d-flex align-items-center">
                                    {comments.filter(comment => comment.post === post.id).length}
                                    <i className="pg-icon">comment</i>
                                    </a>
                                </li>
                            </ul><br />

                        </div>
                    </Link>
                                                <Link to={`/user/${post.author}`} className="card-header clearfix last">
                                <div className="user-pic">
                                    <img alt="Profile Image" width="33" height="33"
                                         data-src-retina="/executive/assets/img/profiles/7x.jpg"
                                         data-src="/executive/assets/img/profiles/7x.jpg"
                                         src="/executive/assets/img/profiles/7x.jpg"/>
                                </div>
                                <h5>{post.author}</h5>
                            </Link>
                    {comments.filter(comment => comment.post === post.id).map(comment => (
                        <div className="card-header clearfix last" key={comment.id}>
                            {comment.text}<br /><br />
                            <h5>{comment.author}</h5>
                        </div>
                    ))}
                </div>
            ))}
        </React.Fragment>
    );
}
export default PostList;
