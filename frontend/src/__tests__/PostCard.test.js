import PostCard from "./PostCard";
import {findAllByText, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../state/store";


beforeEach(() => {
    const post = {
        'id': 1,
        'author': 'test',
        'pub_date': 'now',
        'text': 'trying to learn rtl',
        'tags': [{'id': 1, 'name': '#hiking'}, {'id': 2, 'name': '#running'}],
        'likes_count': 5,
    };

    const comments = [
        {id: 1, text: 'I like hiking', author: 'test', pub_date: '2 seconds ago', likes: 5},
        {id: 2, text: 'I love football', author: 'vienio', pub_date: '4 hours ago', likes: 2}
    ];

    render(
        <Provider store={store}>
            <BrowserRouter>
                <PostCard post={post} comments={comments} key={post.id}/>
            </BrowserRouter>
        </Provider>
    );
});

test('renders information properly', async () => {
    const author = screen.getByText(/test/i);
    const text = screen.getByText(/trying to learn rtl/i);
    const tag1 = screen.getByText('#hiking');
    const tag2 = screen.getByText('#running');
    const likes = screen.getByText('5 Likes');
    const comments = screen.getByText('2 Comments');

    expect(author).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
});

test('renders comments properly', async () => {
    const commentText = screen.getByText('I like hiking');

    expect(commentText).toBeInTheDocument();
});

test('showing proper amount of likes after clicking like button', async () => {
//
});

test('showing comments after clicking showComments button', async () => {
//
});

test('showing reply form after clicking reply button', async () => {
//
});

test('adds comment under post after submiting', async() => {
//
});