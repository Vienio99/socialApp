import React from "react";
import Main from "../Components/Main";
import UserDetail from "../Components/UserDetail";

//TO-DO - define prop types and read about it
//TO-DO - destructure 'match' more

// eslint-disable-next-line react/prop-types
function UserScreen({ match }) {
    return (
        <React.Fragment>
            {/* eslint-disable-next-line react/prop-types */}
            <Main content={<UserDetail username={match.params.username}/>} />
        </React.Fragment>
    );
}

export default UserScreen;
