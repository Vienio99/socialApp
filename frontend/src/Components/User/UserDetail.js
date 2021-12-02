import {useEffect} from 'react';
import React from "react";
import PropTypes from "prop-types";
import {getUser} from "../../state/actions/users";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader";

function UserDetail(props) {
    const {username} = props;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const isLoading = useSelector((state) => state.users.isLoading);

    useEffect(() => {
        dispatch(getUser(username));
    }, [dispatch, username]);

    return (
        <div className="flex-grow mx-auto">
            {(isLoading && !user.length) && <Loader/>}
            <h1>{user.username}</h1>
        </div>
    );
}

UserDetail.propTypes = {
    username: PropTypes.string
};

export default UserDetail;
