import React from "react";
import Main from "../Components/Main";
import SignupForm from "../Components/Forms/SignupForm";

function SignupScreen() {

    const content = <SignupForm/>;

    return (
        <Main content={<SignupForm/>} />
    );
}

export default SignupScreen;
