import axiosInstance from "../../axios";
import { LOGIN_SUCCESS } from "./types";
import {store} from "../store";


// Login user
export const login = (username, password) => {
    console.log('username from actions: ' + username);
    axiosInstance
        .post('user/token/', {
            'username': username,
            'password': password
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




// const handleSubmit = (e) => {
//     axiosInstance
//         .post('user/token/', {
//             'username': username,
//             'password': password
//         })
//         .then((response) => {
//             localStorage.setItem("access_token", response.data['access']);
//             localStorage.setItem("refresh_token", response.data['refresh']);
//             // update header in axios instance to new token
//             axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
//             history.push(
//                 '/',
//             );
//         })
//         .catch(response => console.log(response));
// };