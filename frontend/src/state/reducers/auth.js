import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL, USER_LOADING, USER_LOADED
} from "../actions/types";
import axiosInstance from "../../axios";
import jwt_decode from "jwt-decode";

const initialState = {
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
    isLoading: false,
    isAuthenticated: null,
    username: null,
    error: null
};

const reducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            localStorage.setItem("access_token", payload.access);
            // update header in axios instance to new token
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                // Decode access token and use it to set username
                username: jwt_decode(payload.access)['username']
            };
        case LOGIN_SUCCESS:
            console.log('access' + payload.access);
            localStorage.setItem("access_token", payload.access);
            localStorage.setItem("refresh_token", payload['refresh']);
            // update header in axios instance to new token
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
            console.log(payload);
            return {
                ...state,
                isAuthenticated: true,
                // Decode access token and use it to set username
                username: jwt_decode(payload.access)['username'],
                accessToken: payload.access,
                refreshToken: payload['refresh'],
            };
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            localStorage.clear();
            axiosInstance.defaults.headers['Authorization'] = null;

            // Remove tokens from state as well because otherwise loadUser function in App
            // could trigger faster than removing items from local storage

            return {
                ...state,
                isAuthenticated: false,
                username: null,
                accessToken: null,
                refreshToken: null,
            };
        default:
            return state;
    }
};

export default reducer;