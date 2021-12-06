import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axiosInstance from '../../axios';
import {signup} from "../../state/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CLEAR_ERRORS, CLEAR_MESSAGE} from "../../state/actions/types";
import {useAlert} from "react-alert";

// TO-DO - check if user exists on backend

const schema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required.')
            .min(4, 'Username must be 4 to 20 characters long.')
            .max(20, 'Username must be 4 to 20 characters long.')
            .matches(/^[A-Za-z0-9]+$/, 'Username must contain letters and numbers only.'),
        password1: Yup.string()
            .required('Password is required.')
            .min(4, 'Password must be 4 to 20 characters long.')
            .max(20, 'Password must be 4 to 20 characters long.'),
        password2: Yup.string()
            .required('Password confirmation is required.')
            .oneOf([Yup.ref('password1'), null], 'Passwords do not match.')
    }
);

function SignupForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.errors.message.username);
    const message = useSelector((state) => state.messages.message);
    const alert = useAlert();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm({resolver: yupResolver(schema)});


    const handleRegister = (data) => {
        dispatch(signup(data.username, data.password1, data.password2));
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }

        console.log('error' + error);
        if (error) {
            alert.show(error, {type: 'error'});
            // Clear errors after displaying them because otherwise it will pop up again after routing back to Signup Form
            dispatch({type: CLEAR_ERRORS});
        }
        console.log('message' + message);
        if (message !== '') {
            alert.show(message, {type: 'success'});
            history.push('/login',);
            dispatch({type: CLEAR_MESSAGE});
        }
    }, [alert, dispatch, error, history, isSubmitSuccessful, reset, message]);

    return (
        <div className="flex-grow mx-auto">
            <form className="flex flex-col max-w-4xl px-8 pt-6 pb-8 mb-4 bg-gray-200 rounded shadow-md"
                  onSubmit={handleSubmit(handleRegister)}>
                <h1 className="mb-5 text-2xl font-bold text-center text-gray-700">SignUp</h1>
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
                        {...register('password1')}
                    />
                    {errors.password1 &&
                    <p className="px-3 mt-2 text-xs italic text-red-500">{errors.password1.message}</p>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password2">
                        Repeat password *
                    </label>
                    <input
                        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none border-red"
                        id="password1"
                        type="password"
                        placeholder="Repeat password"
                        {...register('password2')}
                    />
                    {errors.password2 &&
                    <p className="px-3 mt-2 text-xs italic text-red-500">{errors.password2.message}</p>}
                </div>
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

