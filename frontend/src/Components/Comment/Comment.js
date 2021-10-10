import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';



function Comment(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/comment/'
            );
            setData(response.data);
        };
        fetchData();
    }, []);
    return (
        <div>
            {data.map(comment => (
                <div key={comment.id}>
                    {comment.text}
                </div>
                )
            )}
        </div>

    );
}

export default Comment;