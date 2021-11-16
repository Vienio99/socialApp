import axiosInstance from "../../axios";
import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from "./types";
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
            store.dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
        })
        .catch(response => console.log(response));
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

