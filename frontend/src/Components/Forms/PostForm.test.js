import {findAllByText, fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../state/store";
import PostForm from "./PostForm";


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
    const submitButton = screen.getByText('Send');
    return {
        text,
        tags,
        submitButton
    };
};

test('renders empty form properly',() => {
    const { text, tags, submitButton } = setUp();

    expect(text).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    expect(text).toHaveValue('');
    expect(tags).toHaveValue('');

});

test('disables submit button until form is valid', () => {
    const { text, tags, submitButton } = setUp();

    fireEvent.change(text, {target: {value: 'Test text'}});
    fireEvent.change(tags, {target: {value: 'hiking'}});

    expect(text).toHaveValue('Test text');
    expect(tags).toHaveValue('hiking');

    expect(submitButton).not.toBeDisabled();
});

test('displays information at the bottom of the field if input is invalid', () => {
    const { text, tags, submitButton } = setUp();

    fireEvent.change(text, {target: {value: 'Test text'}});
    fireEvent.change(tags, {target: {value: 'hiking'}});

    const error = screen.queryAllByText('Please fill out this field.');

});
