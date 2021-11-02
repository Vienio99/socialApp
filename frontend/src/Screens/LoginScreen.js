import React from "react";
import LoginForm from "../Components/Forms/LoginForm";
import Main from "../Components/Main";

function LoginScreen() {

    const content = <LoginForm/>;

    return (
        <Main content={<LoginForm/>} />
    );
}

export default LoginScreen;
