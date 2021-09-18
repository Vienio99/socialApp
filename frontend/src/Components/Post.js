import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';



function Post(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/post/'
            );
            setData(response.data);
        };
        fetchData();
    }, []);
    return (
        <React.Fragment>
            {data.map(post => (
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
                    <div className="card-header clearfix last">
                        {/*<div className="user-pic">*/}
                        {/*    <img alt="Profile Image" width="33" height="33" data-src-retina="assets/img/profiles/7x.jpg"*/}
                        {/*         data-src="assets/img/profiles/7.jpg" src="../assets/img/profiles/7x.jpg"/>*/}
                        {/*</div>*/}
                        <h5>{post.author}</h5>
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

export default Post;
