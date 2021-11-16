import axiosInstance from "../../axios";
import {store} from "../store";
import axios from "axios";
import {GET_POSTS} from "./types";


export const getPosts = () => {
    axios.all([
        axiosInstance.get('post/'),
        axiosInstance.get('comment/')
    ])
        .then(axios.spread((posts, comments) => {
            const payload = {posts: posts.data, comments: comments.data};
            store.dispatch({
                type: GET_POSTS,
                payload: payload
            });
        }));
};