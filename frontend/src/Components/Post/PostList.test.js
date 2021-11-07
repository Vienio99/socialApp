import PostList from "./PostList";
import {findAllByText, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {configure} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";

// Added class as testId attribute
// configure({testIdAttribute: 'class'});

test('Loader component disappears after fetching the data', async () => {
    render(<BrowserRouter>
        <PostList/>
    </BrowserRouter>);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(
        () => screen.getByTestId('spinner')
    );
    expect(spinner).not.toBeInTheDocument();
});

test('There is appropriate amount of PostCards on one page', async () => {
    render(<BrowserRouter>
        <PostList/>
    </BrowserRouter>);

    await waitFor(() => {
        screen.getAllByRole('listitem');
    });

    const posts = screen.getAllByRole('listitem');

    expect(posts.length).toBe(20);
});

// Given 100 posts, there is x pages

// After sending a post form, text on form disappears and post appears on the page

// Test routes?

// After clicking on post, it's text appears

//