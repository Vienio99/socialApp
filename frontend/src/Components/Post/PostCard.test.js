import PostCard from "./PostCard";
import {findAllByText, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";


test('PostCard renders information properly', async () => {

    const post = {
        'id': 1,
        'author': 'test',
        'pub_date': 'now',
        'text': 'trying to learn rtl',
        'tags': [{'id': 1, 'name': '#hiking'}, {'id': 2, 'name': '#running'}],
        'likes': 5,
    };

    const comments = [];

    render(<BrowserRouter>
        <PostCard post={post} comments={comments} key={post.id}/>
    </BrowserRouter>);

    const author = screen.getByText(/test/i);

    expect(author).toBeInTheDocument();
    // expect(spinner).toBeInTheDocument();
    // await waitForElementToBeRemoved(
    //     () => screen.getByTestId('spinner')
    // );
    // expect(spinner).not.toBeInTheDocument();
});
