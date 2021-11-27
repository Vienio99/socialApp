import Post from "../Components/Post/Post";
import {findAllByText, fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider, useSelector} from "react-redux";
import {store} from "../state/store";
import {deletePost} from "../state/actions/posts";


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
        {id: 1, post_id: 1, text: 'I like hiking', author: 'test', pub_date: '2 seconds ago', likes: 5},
        {id: 2, post_id: 1, text: 'I love football', author: 'vienio', pub_date: '4 hours ago', likes: 2}
    ];

    render(
        <Provider store={store}>
            <BrowserRouter>
                <Post post={post} key={post.id}/>
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
    // TO-DO: should match '2 Comments' since this amount is assosciated with the post (need to fix comment_amount in Django)
    const comments = screen.getByText('0 Comments');

    expect(author).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
});

test('showing proper amount of likes after clicking like button', async () => {
//
});

test('switching Show comments button to Hide comments after click', async () => {
    const showCommentsButton = screen.queryByText('Show comments');

    expect(showCommentsButton).toBeInTheDocument();
    fireEvent.click(showCommentsButton);

    const hideCommentsButton = screen.queryByText('Hide comments');
    expect(hideCommentsButton).toBeInTheDocument();
});

// test('showing comments after clicking showComments button', async () => {
//     const showCommentsButton = screen.queryByText('Show comments');
//
//     expect(showCommentsButton).toBeInTheDocument();
//     expect(hideCommentsButton).not.toBeInTheDocument();
//     fireEvent.click(showCommentsButton);
// });

test('reply button not showing for non authenticated user', () => {
    const showReplyFormButton = screen.queryByText('Reply');
    expect(showReplyFormButton).not.toBeInTheDocument();
});

test('reply button showing for authenticated user', () => {
    const showReplyFormButton = screen.queryByText('Reply');


    expect(showReplyFormButton).toBeInTheDocument();

});

test('edit and delete buttons not showing for non authenticated user', () => {
    const editPostButton = screen.queryByTitle('Edit post');
    const deletePostButton = screen.queryByTitle('Delete post');

    expect(editPostButton).not.toBeInTheDocument();
    expect(deletePostButton).not.toBeInTheDocument();
});

test('edit and delete buttons showing only for author of the post', () => {
});

test('edit and delete buttons showing only for author of the comment', () => {
});

// test('showing reply form after clicking reply button', async () => {
//     // TO-DO: first authenticate user
//     const showReplyFormButton = screen.getByText('Reply');
//     console.log(showReplyFormButton);
//
//     fireEvent.click(showReplyFormButton);
//
//     // const submitReply = screen.queryByText('Reply');
//     // expect(submitReply).toBeInTheDocument();
// });
