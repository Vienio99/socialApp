import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axiosInstance from '../../axios';

// TO-DO - check if user exists

function SignupForm() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post('user/', {
                username: username,
                password: password
            })
            .then(() => {
                history.push(
                    '/login',
                    {showModal: true}
                );
            })
            .catch(response => console.log(response));
    };

    return (
        <div className="flex-grow mx-auto">
            <form className="flex flex-col max-w-4xl px-8 pt-6 pb-8 mb-4 bg-gray-200 rounded shadow-md"
                  onSubmit={e => handleSubmit(e)}>
                <h1 className="mb-5 text-2xl font-bold text-center text-gray-700">SignUp</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                        Username *
                    </label>
                    <input className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none"
                           id="username"
                           type="text"
                           placeholder="Username"
                           onChange={e => setUsername(e.target.value.trim())}
                           value={username}/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Password *
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-gray-700 border rounded shadow appearance-none border-red"
                        id="password"
                        type="password"
                        placeholder="**********"
                        onChange={e => setPassword(e.target.value)}
                        value={password}/>
                    <p className="text-xs italic text-red">Please input a password.</p>
                </div>
                {/*<div className="mb-6">*/}
                {/*    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">*/}
                {/*        Repeat password*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3"*/}
                {/*        id="repeatPassword" type="repeatPassword" placeholder="**********"/>*/}
                {/*    <p className="text-red text-xs italic">Please repeat a password.</p>*/}
                {/*</div>*/}
                <div className="flex items-center justify-between">
                    <button
                        className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300"
                        type="submit">
                        Sign Up
                    </button>
                    <a className="inline-block text-sm font-bold text-gray-700 align-baseline hover:text-gray-900"
                       href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;

