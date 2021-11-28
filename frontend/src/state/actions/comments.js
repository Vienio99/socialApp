import axiosInstance from "../../axios";
import {returnErrors} from "./messages";
import {getPosts} from "./posts";

// ADD COMMENT
export const replyPost = (text, id) => {
    return function (dispatch, getState) {
        console.log(getState().auth.username);
        axiosInstance
            .post(`comment/`, {'author': getState().auth.username, 'text': text, 'post': id})
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

// EDIT COMMENT
export const editComment = (id) => {
    return function (dispatch) {
        axiosInstance
            // TO-DO: add data here later
            .patch(`comment/${id}`, {})
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


// DELETE COMMENT
export const deleteComment = (id) => {
    return function (dispatch) {
        axiosInstance
            .delete(`comment/${id}`)
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

// LIKE COMMENT
export const likeComment = (id) => {
    return function (dispatch, getState) {
        console.log(id);
        axiosInstance
            .patch(`comment/${id}`, {'likes': [getState().auth.username]})
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