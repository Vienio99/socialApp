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
            console.log(response.data);
        };
        fetchData();
    }, []);
    console.log(data);
    return (
        <div>
            {data.map(post => (
                <div className="card social-card share col1 ng-star-inserted" key={post.id}>
                    <div className="card-header clearfix">
                        <div>{post.author}</div>
                        <div>{post.title}</div>
                    </div>
                    <div className="card-description">
                        <p className="ng-tns-c18-8 ng-star-inserted">
                            {post.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Post;
