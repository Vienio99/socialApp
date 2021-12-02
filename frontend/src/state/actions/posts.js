import axiosInstance from "../../axios";
import axios from "axios";
import {POSTS_FETCH, POSTS_FETCH_SUCCESS} from "./types";
import {returnErrors} from "./messages";

// GET POSTS

export const getPosts = () => {
    return function (dispatch) {
        dispatch({
            type: POSTS_FETCH
        });
        axios.all([
            axiosInstance.get('post/'),
            axiosInstance.get('comment/')
        ])
            .then(axios.spread((posts, comments) => {
                const payload = {posts: posts.data, comments: comments.data};
                dispatch({
                    type: POSTS_FETCH_SUCCESS,
                    payload: payload
                });
            }))
            .catch((error) => {
                console.log(error);
                dispatch(returnErrors(error.response.data, error.response.status));
            });
    };

};

// In this requests, bear in mind that token is in the header already (using localStorage), that's why user has access

// ADD POST
export const addPost = (text, tags) => {
    return function (dispatch, getState) {
        // Get current user
        const author = getState().auth.username;
        axiosInstance
            .post('post/', {
                author: author,
                text: text,
                tags: tags
            })
            .then((response) => {
                console.log(response);
                // now this action is used here and in PostList component as well in useEffect, maybe change it somehow?
                // but it runs once anyway idk why
                dispatch(getPosts());
            })
            .catch((error) => {
                console.log(error);
                dispatch(returnErrors(error.response.data, error.response.status));
            });
    };
};

// EDIT POST

export const editPost = (id, text, tags) => {
    return function (dispatch) {
        axiosInstance
            // TO-DO: add data here later
            .patch(`post/${id}`, {'text': text, 'tags': tags})
            .then((response) => {
                console.log(response);
                dispatch(getPosts());
            })
            .catch((error) => {
                console.log(error);
                dispatch(returnErrors(error.response.data, error.response.status));

            });
    };
};

// DELETE POST

export const deletePost = (id) => {
    return function (dispatch) {
        axiosInstance
            .delete(`post/${id}`)
            .then((response) => {
                console.log(response);
                dispatch(getPosts());
            })
            .catch((error) => {
                console.log(error);
                dispatch(returnErrors(error.response.data, error.response.status));
            });
    };
};

export const likePost = (id) => {
    return function (dispatch, getState) {
        console.log(id);
        axiosInstance
            .patch(`post/${id}`, {'likes': [getState().auth.username]})
            .then((response) => {
                console.log(response);
                dispatch(getPosts());
            })
            .catch(error => {
                console.log(error);
                dispatch(returnErrors(error.response.data, error.response.status));

            });
    };
};


