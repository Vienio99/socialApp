import React, {useEffect, useState} from "react";
import axios from 'axios';

// TO-DO - change form so it looks properly

function LoginForm() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/user/'
            );
            setUser(response.data);
        };
        fetchUser();
    }, []);

    //send token
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/v1/user/');
    };

    return (
        <div className="flex-grow mx-auto">
            <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-4xl">
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
            </div>
        </div>
    );
}

export default LoginForm;

