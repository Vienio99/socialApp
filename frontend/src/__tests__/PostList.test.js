import PostList from "../Components/Post/PostList";
import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../state/store";
import PostForm from "../Components/Forms/PostForm";

// Added class as testId attribute
// configure({testIdAttribute: 'class'});

beforeEach(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <PostList />
            </BrowserRouter>
        </Provider>
    );
});

test('loader component disappears after fetching the data', async () => {
    const spinner = screen.queryByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(
        () => screen.queryByTestId('spinner')
    );
    expect(spinner).not.toBeInTheDocument();
});

test('there is appropriate amount of PostCards on one page', async () => {
    await waitFor(() => {
        screen.queryAllByRole('listitem');
    });

    const posts = screen.queryAllByRole('listitem');

    expect(posts.length).toBe(10);
});

test('given x posts, there is proper amount of pages rendered', () => {
});


// Given 100 posts, there is x pages

// Test routes?