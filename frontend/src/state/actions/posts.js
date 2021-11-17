import axiosInstance from "../../axios";
import {store} from "../store";
import axios from "axios";
import {ADD_POST, GET_POSTS, POSTS_FETCH, POSTS_FETCHED} from "./types";


export const getPosts = () => {
    store.dispatch({
        type: POSTS_FETCH
    });
    axios.all([
        axiosInstance.get('post/'),
        axiosInstance.get('comment/')
    ])
        .then(axios.spread((posts, comments) => {
            const payload = {posts: posts.data, comments: comments.data};
            store.dispatch({
                type: POSTS_FETCHED,
                payload: payload
            });
        }))
        .catch(response => console.log(response));
};


export const addPost = (text, tidyTags) => {
    axiosInstance
        .post('post/', {
            // TO-DO: change to real user - 1 is for tests only
            author: 1,
            text: text,
            tags: tidyTags
        })
        .then((response) => {
            console.log(response);
            // now this action is used here and in PostList component as well in useEffect, maybe change it somehow?
            // but it runs once anyway idk why
            getPosts();
        })
        .catch(response => console.log(response));
};