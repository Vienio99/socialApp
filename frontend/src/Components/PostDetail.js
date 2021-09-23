import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import PropTypes from "prop-types";

function PostDetail(props) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios(
                // eslint-disable-next-line react/prop-types
                `http://127.0.0.1:8000/api/v1/post/${props.id}`
            );
            setPost(response.data);
        };
        fetchPost();
        // eslint-disable-next-line react/prop-types
    }, [props.id]);
    return (
        <React.Fragment>
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
                        <div className="time">Posted {post.pub_date} hours ago</div>
                        <ul className="reactions">
                            <li><a href="#" className="d-flex align-items-center">23 <i
                                className="pg-icon">like</i></a>
                            </li>
                            <li><a href="#" className="d-flex align-items-center">2<i
                                className="pg-icon">comment</i></a>
                            </li>
                        </ul>
                    </div>
                </Link>
                <Link to={`/user/${post.author}`} className="card-header clearfix last">
                    {/*<div className="user-pic">*/}
                    {/*    <img alt="Profile Image" width="33" height="33" data-src-retina="assets/img/profiles/7x.jpg"*/}
                    {/*         data-src="assets/img/profiles/7.jpg" src="../assets/img/profiles/7x.jpg"/>*/}
                    {/*</div>*/}
                    <h5>{post.author}</h5>
                </Link>
            </div>
        </React.Fragment>
    );
}


PostDetail.propTypes = {
    props: PropTypes.shape({
        id: PropTypes.string
    })
};

export default PostDetail;