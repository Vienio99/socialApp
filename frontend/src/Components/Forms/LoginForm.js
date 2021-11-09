import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useLocation} from "react-router-dom";
import SuccessModal from "./SuccessModal";
import Loader from "../Loader";
import axiosInstance from "../../axios";

// TO-DO - change form so it looks properly

function LoginForm(props) {
    // Use location to show modal after redirecting from signup page
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState([]);

    useEffect(() => {
        try {
           setShowModal(location.state.showModal);
        } catch (error) {
           setShowModal(false);
        }
    }, []);

    return (
        <div className="flex-grow mx-auto">
            {showModal && <SuccessModal />}
            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-5 text-gray-700">Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                           id="username"
                           type="text" placeholder="Username"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3"
                        id="password" type="password" placeholder="**********"/>
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

