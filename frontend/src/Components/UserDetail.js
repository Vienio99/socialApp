import {useEffect, useState} from 'react';
import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";

function UserDetail(props) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios(
                `http://127.0.0.1:8000/api/v1/user/${props.username}`
            );
            setUser(response.data);
        };
        fetchUser();
    }, [props.username]);

    return (
        <h1>{user.username}</h1>
    );
}

UserDetail.propTypes = {
    username: PropTypes.object
};

export default UserDetail;
