import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../state/store";
import LoginForm from "../Components/Forms/LoginForm";


beforeEach(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <LoginForm/>
            </BrowserRouter>
        </Provider>
    );
});

const setUp = () => {
    const username = screen.queryByPlaceholderText(/Username/i);
    const password = screen.queryByPlaceholderText(/Password/i);
    const submitButton = screen.getByText('Sign In');

    return {
        username,
        password,
        submitButton
    };
};

test('renders empty form properly', () => {
    const {username, password, submitButton} = setUp();

    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(username).toHaveValue('');
    expect(password).toHaveValue('');
});

test('input fields are blank after submitting the form', async () => {
    const {username, password, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'test'}});
        fireEvent.change(password, {target: {value: '123456'}});
        fireEvent.click(submitButton);
    });

    expect(username).toHaveValue('');
    expect(password).toHaveValue('');
});

test('displaying error if user did not input username or password', async () => {
    const {submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const usernameError = screen.queryByText('Username is required.');
    const passwordError = screen.queryByText('Password is required.');

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
});

test('removes error messages if input is valid', async () => {
    const {username, password, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const usernameError = screen.queryByText('Username is required.');
    const passwordError = screen.queryByText('Password is required.');

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'test'}});
        fireEvent.change(password, {target: {value: '123456'}});
    });

    expect(usernameError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
});

// test('displaying error if user does not exist', async () => {
//     const {submitButton} = setUp();
//
//     await waitFor(() => {
//         fireEvent.click(submitButton);
//     });
//
//     const error = screen.queryByText('User with that credentials does not exist.');
//
//     expect(error).toBeInTheDocument();
// });