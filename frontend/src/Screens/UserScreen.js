import React from "react";
import UserDetail from "../Components/User/UserDetail";
import PropTypes from 'prop-types';


function UserScreen({match}) {
    const {username} = match.params;
    return (
        <UserDetail username={username}/>
    );
}

UserScreen.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            username: PropTypes.string
        })
    })
};

export default UserScreen;
