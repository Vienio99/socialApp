import axiosInstance from "../../axios";
import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS} from "./types";
import {store} from "../store";


// Login user
export const login = (username, password) => {
    axiosInstance
        .post('user/token/', {
            username: username,
            password: password
        })
        .then((response) => {
            console.log(response);
            // Add username to response for reducer
            response.data['username'] = username;
            store.dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
        })
        .catch((response) => {
            // send response to error reducer
            console.log(response);
            store.dispatch({
                type: LOGIN_FAIL
            });
        });
};

// Logout user
export const logout = () => {
    axiosInstance
        .post('user/token/blacklist/', {
            access: localStorage.getItem('access_token'),
            refresh: localStorage.getItem('refresh_token'),
        })
        .then(response => {
            console.log(response);
            store.dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(response => console.log(response));
};

// Register user
export const register = (username, password) => {
    axiosInstance
        .post('user/', {
            // Not sure why there must be string on key, but when it comes to JWT requests there is no need
            'username': username,
            'password': password,
        })
        .then((response) => {
            console.log(response);
            store.dispatch({
                type: REGISTER_SUCCESS
            });
        })
        .catch((response) => {
            // send response to error reducer
            console.log(response.content);
            store.dispatch({
                type: REGISTER_FAIL
            });
        });
};