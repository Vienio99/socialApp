import React from "react";
import Main from "../Components/Main";
import LoginForm from "../Components/Forms/LoginForm";

function LoginScreen() {

    const content = <React.Fragment>
                        <LoginForm/>
                    </React.Fragment>;

    return (
        <React.Fragment>
            <Main content={content}/>
        </React.Fragment>
    );
}

export default LoginScreen;
