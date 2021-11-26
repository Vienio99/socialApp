import PostList from "./PostList";
import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../state/store";

// Added class as testId attribute
// configure({testIdAttribute: 'class'});

test('Loader component disappears after fetching the data', async () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <PostList/>
            </BrowserRouter>
        </Provider>);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(
        () => screen.getByTestId('spinner')
    );
    expect(spinner).not.toBeInTheDocument();
});

test('There is appropriate amount of PostCards on one page', async () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <PostList/>
            </BrowserRouter>
        </Provider>);

    await waitFor(() => {
        screen.getAllByRole('listitem');
    });

    const posts = screen.getAllByRole('listitem');

    expect(posts.length).toBe(10);
});


// Given 100 posts, there is x pages

// After sending a post form, text on form disappears and post appears on the page

// Test routes?

// After clicking on post, it's text appears

//