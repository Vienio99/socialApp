import axiosInstance from "../../axios";
import axios from "axios";
import {CREATE_ERROR_MESSAGE, POSTS_FETCH, POSTS_FETCH_SUCCESS} from "./types";

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
            .catch(response => {
                dispatch({
                    type: CREATE_ERROR_MESSAGE,
                    payload: {
                        message: response.content,
                        status: response.status
                    }
                });
            });
    };

};

// In this requests, bear in mind that token is in the header already (using localStorage), that's why user has access


// ADD POST
export const addPost = (text, tidyTags) => {
    return function (dispatch, getState) {
        const author = getState().auth.username;
        console.log(author);
        axiosInstance
            .post('post/', {
                // TO-DO: change to real user - 1 is for tests only. change it in Django's serializer
                author: 1,
                text: text,
                tags: tidyTags
            })
            .then((response) => {
                console.log(response);
                // now this action is used here and in PostList component as well in useEffect, maybe change it somehow?
                // but it runs once anyway idk why
                dispatch(getPosts());
            })
            .catch(response => {
                dispatch({
                    type: CREATE_ERROR_MESSAGE,
                    payload: {
                        message: response.content,
                        status: response.status
                    }
                });
            });
    };
};

// EDIT POST

export const editPost = (id) => {
    return function (dispatch) {
        axiosInstance
            // TO-DO: add data here later
            .patch(`post/${id}`, {

            })
            .then((response) => {
                console.log(response);
                // now this action is used here and in PostList component as well in useEffect, maybe change it somehow?
                // but it runs once anyway idk why
                dispatch(getPosts());
            })
            .catch(response => {
                dispatch({
                    type: CREATE_ERROR_MESSAGE,
                    payload: {
                        message: response.content,
                        status: response.status
                    }
                });
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
                // now this action is used here and in PostList component as well in useEffect, maybe change it somehow?
                // but it runs once anyway idk why
                dispatch(getPosts());
            })
            .catch(response => {
                dispatch({
                    type: CREATE_ERROR_MESSAGE,
                    payload: {
                        message: response.content,
                        status: response.status
                    }
                });
            });
    };
};

