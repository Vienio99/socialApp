import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import SuccessModal from "./SuccessModal";
import Loader from "../Loader";
import axiosInstance from "../../axios";
import {login} from "../../state/actions/auth";


function LoginForm(props) {
    // TO-DO - Use location to show modal after redirecting from signup page
    const location = useLocation();
    const history = useHistory();
    // const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Invoke redux action
        login(username, password);
        history.push('/',);
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
            <form className="flex flex-col max-w-4xl px-8 pt-6 pb-8 mb-4 bg-gray-200 rounded shadow-md"
                  onSubmit={e => handleLogin(e)}>
                <h1 className="mb-5 text-2xl font-bold text-center text-gray-700">Login</h1>
                {/*{showModal && <SuccessModal/>}*/}
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
                <div className="flex items-center justify-between">
                    <button
                        className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300"
                        type="submit">
                        Sign In
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

export default LoginForm;

