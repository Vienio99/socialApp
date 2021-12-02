import axiosInstance from "../../axios";
import {returnErrors} from "./messages";
import {USER_FETCH, USER_FETCH_SUCCESS} from "./types";

export const getUser = (username) => {
    return function (dispatch) {
        dispatch({
            type: USER_FETCH
        });
        axiosInstance
            .get(`user/${username}`)
            .then((response) => {
                const payload = response.data;
                console.log(payload);
                dispatch({
                    type: USER_FETCH_SUCCESS,
                    payload: payload
                });
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                dispatch(returnErrors(error.response.data, error.response.status));
            });
    };
};