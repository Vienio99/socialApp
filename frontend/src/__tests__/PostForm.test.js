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
import PostForm from "../Components/Forms/PostForm";
import axios from "../axios";


jest.mock('axios');

beforeEach(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <PostForm />
            </BrowserRouter>
        </Provider>
    );
});

const setUp = () => {
    const text = screen.queryByPlaceholderText(/Text/i);
    const tags = screen.queryByPlaceholderText(/#tags/i);
    const submitButton = screen.getByText(/'Send'/i);

    return {
        text,
        tags,
        submitButton
    };
};

test('renders empty form properly', () => {
    const {text, tags, submitButton} = setUp();

    expect(text).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(text).toHaveValue('');
    expect(tags).toHaveValue('');

});

test('input fields are blank after submitting the form', async () => {
    const {text, tags, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'Test text'}});
        fireEvent.change(tags, {target: {value: '#hiking'}});
        fireEvent.click(submitButton);
    });

    expect(text).toHaveValue('');
    expect(tags).toHaveValue('');
});

test('displays required error messages', async () => {
    const {submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text is required.');
    const tagsError = screen.queryByText('Tags are required.');

    expect(textError).toBeInTheDocument();
    expect(tagsError).toBeInTheDocument();
});

test('displays minimum length error messages', async () => {
    const {text, tags, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'min'}});
        fireEvent.change(tags, {target: {value: '#gn'}});

        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text must be at least 5 characters long.');
    const tagsError = screen.queryByText('Tags have to be at least 5 characters long.');

    expect(textError).toBeInTheDocument();
    expect(tagsError).toBeInTheDocument();
});

test('displays maximum length error messages', async () => {
    const {text, tags, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text '}});
        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text must not exceed 500 characters.');

    expect(textError).toBeInTheDocument();
});

test('displays improper tags format error', async () => {
    const {text, tags, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'Correct text'}});
        fireEvent.change(tags, {target: {value: 'incorrect #tags'}});
        fireEvent.click(submitButton);
    });

    const tagsError = screen.queryByText('Proper format for tags is f.e. #hiking');

    expect(tagsError).toBeInTheDocument();
});

test('removes error messages if input is valid', async () => {
    const {text, tags, submitButton} = setUp();

    await waitFor(() => {
        fireEvent.click(submitButton);
    });

    const textError = screen.queryByText('Text is required.');
    const tagsError = screen.queryByText('Tags are required.');

    expect(textError).toBeInTheDocument();
    expect(tagsError).toBeInTheDocument();

    await waitFor(() => {
        fireEvent.change(text, {target: {value: 'Correct text'}});
        fireEvent.change(tags, {target: {value: '#correct #tags'}});
    });

    expect(textError).not.toBeInTheDocument();
    expect(tagsError).not.toBeInTheDocument();
});