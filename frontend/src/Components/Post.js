import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';



function Post(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/post'
            );
            setData(response.data);
            console.log(response.data);
        };
        fetchData();
    }, []);

  return (
      <ul>
          {data.map(post => (
              <li key={post.id}>
                  <div>{post.title}</div>
              </li>
          ))}
      </ul>
  );
}

export default Post;
