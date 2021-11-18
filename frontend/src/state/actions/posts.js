import axiosInstance from "../../axios";
import {store} from "../store";
import axios from "axios";
import {ADD_POST, CREATE_ERROR_MESSAGE, GET_POSTS, POSTS_FETCH, POSTS_FETCH_FAIL, POSTS_FETCH_SUCCESS} from "./types";


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