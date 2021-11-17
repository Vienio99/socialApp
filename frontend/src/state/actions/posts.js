import axiosInstance from "../../axios";
import {store} from "../store";
import axios from "axios";
import {GET_POSTS, POSTS_FETCH, POSTS_FETCHED} from "./types";


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
        }));
};