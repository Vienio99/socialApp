import React from "react";
import Main from "../Components/Main";
import UserDetail from "../Components/User/UserDetail";
import PropTypes from 'prop-types';


function UserScreen({ match }) {
    const { username } = match.params;
    return (
        <React.Fragment>
            <Main content={<UserDetail username={username}/>} />
        </React.Fragment>
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
