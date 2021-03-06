import axios from 'axios';


const baseURL = 'http://127.0.0.1:8000/api/v1';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        // Not sure if it is necessary, because LoginForm set up new header every time user logs in anyway
        Authorization: localStorage.getItem('access_token') ?
            'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-type': 'application/json',
        accept: 'application/json'
    }
});

export default axiosInstance;