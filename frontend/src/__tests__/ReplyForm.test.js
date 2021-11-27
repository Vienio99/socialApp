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
import ReplyForm from "../Components/Post/ReplyForm";


beforeEach(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <ReplyForm/>
            </BrowserRouter>
        </Provider>
    );
});

const setUp = () => {
    const text = screen.queryByPlaceholderText(/Text/i);
    const submitButton = screen.getByText('Reply');

    return {
        text,
        submitButton
    };
};

test('renders empty form properly', () => {
    const {text, submitButton} = setUp();

    expect(text).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(text).toHaveValue('');
});

test('input fields are blank after submitting the form', async () => {
    const {text, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'Test text'}});
        fireEvent.click(submitButton);
    });

    expect(text).toHaveValue('');
});

test('displays required error messages', async () => {
    const {submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text is required.');

    expect(textError).toBeInTheDocument();
});

test('displays minimum length error messages', async () => {
    const {text, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'min'}});

        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text must be at least 5 characters long.');

    expect(textError).toBeInTheDocument();
});

test('displays maximum length error messages', async () => {
    const {text, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text '}});
        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text must not exceed 500 characters.');

    expect(textError).toBeInTheDocument();
});

test('removes error messages if input is valid', async () => {
    const {text, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text is required.');

    expect(textError).toBeInTheDocument();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'Correct text'}});
    });

    expect(textError).not.toBeInTheDocument();
});