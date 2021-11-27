import axiosInstance from "../../axios";
import {
    LOAD_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS, REFRESH_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS, USER_LOADED, USER_LOADING,
} from "./types";

// LOAD USER AFTER PAGE REFRESH ETC.
export const loadUser = () => {
    return function (dispatch) {
        dispatch({
            type: USER_LOADING,
        });
        console.log('Refreshing token after page refresh!');
        axiosInstance
            .post('user/token/refresh/', {
                'refresh': localStorage.getItem('refresh_token'),
            })
            .then(response => {
                dispatch({
                    type: USER_LOADED,
                    payload: response.data
                });
            })
            .catch(response => {
                dispatch({
                    type: LOAD_FAIL
                });
                console.log(response);
            });
    };
};


// LOGIN USER
export const login = (username, password) => {
    return function (dispatch) {
        dispatch({
            type: USER_LOADING
        });
        axiosInstance
            .post('user/token/', {
                username: username,
                password: password
            })
            .then((response) => {
                console.log(response);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                });
            })
            .catch((response) => {
                // send response to error reducer
                console.log(response);
                dispatch({
                    type: LOGIN_FAIL
                });
            });
    };
};

// LOGOUT USER
export const logout = () => {
    return function (dispatch) {
        axiosInstance
            .post('user/token/blacklist/', {
                access: localStorage.getItem('access_token'),
                refresh: localStorage.getItem('refresh_token'),
            })
            .then(response => {
                console.log(response);
                dispatch({
                    type: LOGOUT_SUCCESS
                });
            })
            .catch(response =>
                console.log(response)
            );
    };
};

// REGISTER USER
export const signup = (username, password, password2) => {
    return function (dispatch) {
        axiosInstance
            .post('user/', {
                // Not sure why there must be string on key, but when it comes to JWT requests there is no need
                'username': username,
                'password': password,
            })
            .then((response) => {
                console.log(response);
                dispatch({
                    type: REGISTER_SUCCESS
                });
            })
            .catch((response) => {
                // send response to error reducer
                console.log(response.content);
                dispatch({
                    type: REGISTER_FAIL
                });
            });
    };
};

// REFRESH TOKEN
export const refreshAccessToken = () => {
    return function (dispatch) {
        console.log('Refreshing token!');
        axiosInstance
            .post('user/token/refresh/', {
                'refresh': localStorage.getItem('refresh_token'),
            })
            .then(response => {
                localStorage.setItem('access_token', response.data.access);
            })
            .catch(response => {
                dispatch({
                    type: REFRESH_FAIL
                });
                console.log(response);
            });
    };
};
