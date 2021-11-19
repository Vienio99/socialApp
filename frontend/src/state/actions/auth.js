import axiosInstance from "../../axios";
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOAD,
} from "./types";

// LOAD USER AFTER PAGE REFRESH ETC.

export const loadUser = () => {
    return function(dispatch) {
        console.log('Refreshing token!');
        axiosInstance
        .post('user/token/refresh/', {
            'refresh': localStorage.getItem('refresh_token'),
        })
        .then(response => {
            dispatch({
                type: USER_LOAD,
                payload: response.data
            });
        })
        .catch(response => console.log(response));
    };
};





// LOGIN USER
export const login = (username, password) => {
    return function (dispatch) {
        axiosInstance
            .post('user/token/', {
                username: username,
                password: password
            })
            .then((response) => {
                console.log(response);
                // Add username to response for reducer
                response.data['username'] = username;
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
    return function(dispatch) {
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
        .catch(response => console.log(response));
    };
};

// REGISTER USER
export const register = (username, password) => {
    return function(dispatch) {
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

export const refreshToken = () => {
    return function(dispatch) {
        console.log('Refreshing token!');
        axiosInstance
        .post('user/token/refresh/', {
            'refresh': localStorage.getItem('refresh_token'),
        })
        .then(response => {
            localStorage.setItem('access_token', response.data['access']);
        })
        .catch(response => console.log(response));
    };
};
