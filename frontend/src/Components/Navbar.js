import React, {useEffect, useState} from "react";
import {
    Link
} from "react-router-dom";
import axiosInstance from "../axios";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../state/actions/auth";
import {getPosts} from "../state/actions/posts";
import Loader from "./Loader";

export default function Navbar() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.isLoading);
    const username = useSelector((state) => state.auth.username);

    // Add token to Django's JWT token blacklist, remove tokens from local storage and redirect user to homepage
    const handleLogout = (e) => {
        e.preventDefault();
        // Invoke redux action

        //TO-DO: after logout posts still have delete and edit buttons visible
        dispatch(logout());
    };

    return (
        //Navbar
        <nav className="fixed sticky top-0 mb-10 text-gray-700 bg-gray-300">
            <div className="container px-4 mx-auto text-center max-w-6-xl">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        {/* Logo */}
                        <div>
                            <a href="#" className="flex items-center px-3 py-6 hover:text-gray-900">
                                <img src="https://img.icons8.com/doodle/50/000000/nintendo-switch-pro-controller.png"
                                     width="35px" alt=""/>
                                <span className="font-bold">HobbyHub</span>
                            </a>
                        </div>
                        {/* Links on the left */}
                        <div className="flex items-center hidden md:flex space-x-1">
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Home</Link>
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Hottest</Link>
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Newest</Link>
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Favorites</Link>
                        </div>
                    </div>
                    {/* Search bar */}
                    {/*<div className="relative pt-5 mx-auto text-gray-600">*/}
                    {/*    <input*/}
                    {/*        className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"*/}
                    {/*        type="search" name="search" placeholder="Search"/>*/}
                    {/*    <button type="submit" className="absolute top-0 right-0 mt-8 mr-4">*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none"*/}
                    {/*             viewBox="0 0 24 24" stroke="currentColor">*/}
                    {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                    {/*                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>*/}
                    {/*        </svg>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    {/* User info / Login signup */}
                    <div className="flex items-center hidden md:flex space-x-2">
                        {isAuthenticated ? (
                                <>
                                    <p className="py-6 hover:text-gray-900">Hi {username}!</p>
                                        <Link to="/settings" className="pr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                        </Link>
                                    <Link to="/">
                                        <button onClick={e => handleLogout(e)}
                                                className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300">
                                            Logout
                                        </button>
                                    </Link>
                                </>
                            )
                            : (
                                <>
                                    {isLoading ? (
                                        <Loader/>
                                    ) : (
                                        <>
                                            <Link to="/login">
                                                <button className="px-4 py-2 hover:text-gray-900">
                                                    Login
                                                </button>
                                            </Link>
                                            <Link to="/signup">
                                                <button
                                                    className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300">
                                                    SignUp
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </>

                            )}
                    </div>
                    {/* Hamburger icon */}
                    <div className="flex items-center md:hidden">
                        <button className="mobile-menu-button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            <div className="hidden mobile-menu">
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-200">Home</Link>
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-200">Hottest</Link>
            </div>
        </nav>
    );
}

// Add this script

// const btn = document.querySelector('button.mobile-menu-button');
// const menu = document.querySelector('.mobile-menu');
//
// btn.addEventListener('click', () => {
//     menu.classList.toggle('hidden');
// });