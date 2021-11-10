import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useLocation} from "react-router-dom";
import SuccessModal from "./SuccessModal";
import Loader from "../Loader";
import axiosInstance from "../../axios";

// TO-DO - change form so it looks properly

function LoginForm(props) {
    // TO-DO - Use location to show modal after redirecting from signup page
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState([]);

        const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post('token/', {
                'username': username,
                'password': password
            })
            .then((response) => {
                history.push(
                    '/home',
                );
                console.log(response);
                console.log(response.data);
            });
    };

    // useEffect(() => {
    //     try {
    //         setShowModal(location.state.showModal);
    //     } catch (error) {
    //         setShowModal(false);
    //     }
    // }, []);

    // handleClose;

    return (
        <div className="flex-grow mx-auto">
            <form className="flex flex-col max-w-4xl px-8 pt-6 pb-8 mb-4 bg-gray-200 rounded shadow-md">
                <h1 className="text-2xl font-bold text-center mb-5 text-gray-700">Login</h1>
                {/*{showModal && <SuccessModal/>}*/}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                           id="username"
                           type="text"
                           placeholder="Username"
                           onChange={e => setUsername(e.target.value.trim())}
                           value={username}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3"
                        id="password"
                        type="password"
                        placeholder="**********"
                        onChange={e => setPassword(e.target.value)}
                        value={password}/>
                    <p className="text-red text-xs italic">Please input a password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300"
                        type="button">
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-900"
                       href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

