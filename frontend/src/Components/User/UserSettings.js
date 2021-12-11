import {useEffect, useState} from 'react';
import React from "react";
import PropTypes from "prop-types";
import {getUser} from "../../state/actions/users";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader";

function UserSettings() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users.user);
    const currentUser = useSelector((state) => state.auth.username);
    const isLoadingUsers = useSelector((state) => state.users.isLoading);

    useEffect(() => {
        dispatch(getUser(currentUser));
    }, [currentUser, dispatch]);

    return (
        <div className="flex-grow mx-auto">
            <form className="flex flex-col max-w-4xl px-8 pt-6 pb-8 mb-4 bg-gray-200 rounded shadow-md">
                <h1 className="mb-5 text-2xl font-bold text-center text-gray-700">Change settings</h1>
                <p className="text-xl font-bold text-center">{userData.username}</p>
                <img src={userData.img} width="200px" alt="profile-picture" className="self-center mb-6"/>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Old password *
                    </label>
                    <input
                        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none border-red"
                        id="password"
                        type="password"
                        placeholder="Password"
                    />
                    {/*{errors.password1 &&*/}
                    {/*<p className="px-3 mt-2 text-xs italic text-red-500">{errors.password1.message}</p>}*/}
                </div>
                                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        New password *
                    </label>
                    <input
                        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none border-red"
                        id="password"
                        type="password"
                        placeholder="Password"
                    />
                    {/*{errors.password1 &&*/}
                    {/*<p className="px-3 mt-2 text-xs italic text-red-500">{errors.password1.message}</p>}*/}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password1">
                        Repeat new password *
                    </label>
                    <input
                        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none border-red"
                        id="password1"
                        type="password"
                        placeholder="Repeat password"
                    />
                    {/*{errors.password2 &&*/}
                    {/*<p className="px-3 mt-2 text-xs italic text-red-500">{errors.password2.message}</p>}*/}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="img">
                        New profile picture
                    </label>
                    <input
                        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none border-red"
                        id="img"
                        type="file"
                    />
                </div>
                    <button
                        className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300"
                        type="submit">
                        Update
                    </button>
            </form>
        </div>
    );
}

UserSettings.propTypes = {
    username: PropTypes.string
};

export default UserSettings;
