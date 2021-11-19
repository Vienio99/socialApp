import {
    USER_LOAD,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";
import axiosInstance from "../../axios";

const initialState = {
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
    isLoading: false,
    isAuthenticated: null,
    username: null,
    error: null
};

const reducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("access_token", payload['access']);
            localStorage.setItem("refresh_token", payload['refresh']);
            // update header in axios instance to new token
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');

            return {
                ...state,
                isAuthenticated: true,
                // Get user from the token itself
                username: payload['username']
            };
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;

            return {
                ...state,
                isAuthenticated: false,
                username: null
            };
        case USER_LOAD:
            localStorage.setItem("access_token", payload['access']);
            // update header in axios instance to new token
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');

            return {
                ...state,
                isAuthenticated: true,
                // Get user from the token itself
                username: null
            };
        default:
            return state;
    }
};

export default reducer;