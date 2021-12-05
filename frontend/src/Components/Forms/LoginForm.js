import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {login} from "../../state/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAlert} from "react-alert";
import {CLEAR_ERRORS} from "../../state/actions/types";

const schema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required.'),
        password: Yup.string()
            .required('Password is required.')
    }
);

function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm({resolver: yupResolver(schema)});

    const alert = useAlert();
    const error = useSelector((state) => state.errors.message.detail);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // TO-DO - Use location to show modal after redirecting from signup page
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = (data) => {
        // Invoke redux action
        dispatch(login(data.username, data.password));
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }

        if (error && !isAuthenticated) {
            alert.show(error, {type: 'error'});
            // Clear errors after displaying them because otherwise it will pop up again after routing back to Login Form
            dispatch({type: CLEAR_ERRORS});
        }

        if (isAuthenticated) {
            alert.show('Login successful!', {type: 'success'});
            history.push('/',);
        }
    }, [isSubmitSuccessful, reset, error, alert, isAuthenticated, dispatch, history]);

    return (
        <div className="flex-grow mx-auto">
            <form className="flex flex-col max-w-4xl px-8 pt-6 pb-8 mb-4 bg-gray-200 rounded shadow-md"
                  onSubmit={handleSubmit(handleLogin)}>
                <h1 className="mb-5 text-2xl font-bold text-center text-gray-700">Login</h1>
                {/*{showModal && <Alert/>}*/}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                        Username *
                    </label>
                    <input className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none"
                           id="username"
                           type="text"
                           placeholder="Username"
                           {...register('username')}
                    />
                    {errors.username &&
                    <p className="px-3 mt-2 text-xs italic text-red-500">{errors.username.message}</p>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Password *
                    </label>
                    <input
                        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none border-red"
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    {errors.password &&
                    <p className="px-3 mt-2 text-xs italic text-red-500">{errors.password.message}</p>}
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

