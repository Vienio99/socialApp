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
import SignupForm from "../Components/Forms/SignupForm";


beforeEach(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SignupForm/>
            </BrowserRouter>
        </Provider>
    );
});

const setUp = () => {
    const username = screen.queryByPlaceholderText(/Username/i);
    const password1 = screen.queryByPlaceholderText(/Password1/i);
    const password2 = screen.queryByPlaceholderText(/Password2/i);
    const submitButton = screen.getByText('Sign Up');

    return {
        username,
        password1,
        password2,
        submitButton
    };
};

test('renders empty form properly', () => {
    const {username, password1, password2, submitButton} = setUp();

    expect(username).toBeInTheDocument();
    expect(password1).toBeInTheDocument();
    expect(password2).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(username).toHaveValue('');
    expect(password1).toHaveValue('');
    expect(password2).toHaveValue('');
});

test('input fields are blank after submitting the form', async () => {
    const {username, password1, password2, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'test'}});
        fireEvent.change(password1, {target: {value: '123456'}});
        fireEvent.change(password2, {target: {value: '123456'}});
        fireEvent.click(submitButton);
    });

    expect(username).toHaveValue('');
    expect(password1).toHaveValue('');
    expect(password2).toHaveValue('');
});


test('displaying error if user did not input username or password', async () => {
    const {submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const usernameError = screen.queryByText('Username is required.');
    const passwordError = screen.queryByText('Password is required.');
    const passwordConfirmationError = screen.queryByText('Password confirmation is required.');

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(passwordConfirmationError).toBeInTheDocument();
});


test('removes error messages if input is valid', async () => {
    const {username, password1, password2, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const usernameError = screen.queryByText('Username is required.');
    const passwordError = screen.queryByText('Password is required.');
    const passwordConfirmationError = screen.queryByText('Password confirmation is required.');

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(passwordConfirmationError).toBeInTheDocument();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'test'}});
        fireEvent.change(password1, {target: {value: '123456'}});
        fireEvent.change(password2, {target: {value: '123456'}});
    });

    expect(usernameError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
});

test('displays passwords do not match error', async () => {
    const {username, password1, password2, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'test'}});
        fireEvent.change(password1, {target: {value: '123456'}});
        fireEvent.change(password2, {target: {value: '654321'}});
        fireEvent.click(submitButton);
    });

    const passwordError = screen.queryByText('Passwords do not match.');

    expect(passwordError).toBeInTheDocument();
});

test('displays incorrect format of username error', async () => {
    const {username, password1, password2, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: '412!!4412'}});
        fireEvent.change(password1, {target: {value: '123456'}});
        fireEvent.change(password2, {target: {value: '654321'}});
        fireEvent.click(submitButton);
    });

    const usernameError = screen.queryByText('Username must contain letters or letters and numbers only.');

    expect(usernameError).toBeInTheDocument();
});

test('displays username length error', async () => {
    const {username, password1, password2, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'test123465757485976967'}});
        fireEvent.change(password1, {target: {value: '123456'}});
        fireEvent.change(password2, {target: {value: '123456'}});
        fireEvent.click(submitButton);
    });

    const usernameError = screen.queryByText('Username must be 4 to 20 characters long.');

    expect(usernameError).toBeInTheDocument();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'tst'}});
    });

    expect(usernameError).toBeInTheDocument();
});

test('displays password length error', async () => {
    const {username, password1, password2, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(username, {target: {value: 'test'}});
        fireEvent.change(password1, {target: {value: '1231231231231231232132'}});
        fireEvent.change(password2, {target: {value: '1231231231231231232132'}});
        fireEvent.click(submitButton);
    });

    const passwordError = screen.queryByText('Password must be 4 to 20 characters long.');

    expect(passwordError).toBeInTheDocument();

    await waitFor(() => {
        fireEvent.change(password1, {target: {value: 'tst'}});
    });

    expect(passwordError).toBeInTheDocument();
});


//
// test('displaying error if user with that username already exist', async () => {
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
//

