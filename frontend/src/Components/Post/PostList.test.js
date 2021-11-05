import PostList from "./PostList";
import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {configure} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";

// Added class as testId attribute
// configure({testIdAttribute: 'class'});

test('if data is being fetched, Loader component is visible', () => {
    render(<PostList/>);
    expect(screen.getByTestId('spinner')).toBeVisible();
});

test('spinner is no longer present in the DOM', async () => {
    render(<BrowserRouter>
                <PostList/>
           </BrowserRouter>);
    await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));
});