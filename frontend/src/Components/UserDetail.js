import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

//TO-DO - ESLint: React Hook useEffect has a missing dependency: 'props.id'.
// Either include it or remove the dependency array.(react-hooks/exhaustive-deps)
// What does that mean????

function UserDetail(props) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios(
                // eslint-disable-next-line react/prop-types
                `http://127.0.0.1:8000/api/v1/user/${props.username}`
            );
            setUser(response.data);
        };
        fetchUser();
        // eslint-disable-next-line react/prop-types
    }, []);

    // eslint-disable-next-line react/prop-types
    return (
        <h1>{user.username}</h1>
    );
}

export default UserDetail;
