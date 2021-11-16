import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";
import axiosInstance from "../../axios";

// TO-DO: does token need to be in the state if it's existing in localStorage?
const initialState = {
    accessToken: null,
    refreshToken: null,
    error: null,
    isLoading: false,
    isAuthenticated: null,
    user: null
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
                accessToken: payload['access'],
                refreshToken: payload['refresh'],
                isAuthenticated: true,
                // Get user either from the token itself or from payload
                user: payload['username']
            };
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;

            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

export default reducer;


//
// case USER_LOADING:
//     return {
//         ...state,
//         isLoading: true
//     };
// case USER_LOADED:
//     return {
//         ...state,
//         isAuthenticated: true,
//         isLoading: false,
//         user: action.payload
//     };
// case AUTH_ERROR:
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     return {
//         ...state,
//         accessToken: null,
//         refreshToken: null,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//     };