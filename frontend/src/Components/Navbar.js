import React from "react";
import {
    Link
} from "react-router-dom";

export default function Navbar() {
    return (
        //Navbar
        <nav className="text-gray-700 bg-gray-100">
            <div className="container mx-auto text-center max-w-6-xl px-28">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        {/* Logo */}
                        <div>
                            <a href="#" className="flex items-center px-3 py-7 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 text-purple-600 w-7 h-7"
                                     fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                </svg>
                                <span className="font-bold">HobbyHub</span>
                            </a>
                        </div>
                        {/* Links on the left */}
                        <div className="flex items-center space-x-1">
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Home</Link>
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Hottest</Link>
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Newest</Link>
                            <Link to="/" className="px-4 py-6 hover:text-gray-900">Favorites</Link>
                        </div>
                    </div>
                    {/* Search bar */}
                    <div className="relative pt-5 mx-auto text-gray-600">
                        <input
                            className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
                            type="search" name="search" placeholder="Search"/>
                        <button type="submit" className="absolute top-0 right-0 mt-8 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </button>
                    </div>
                    {/* User info / Login signup */}
                    <div className="flex items-center space-x-1">
                        <Link to="#" className="px-4 py-6 hover:text-gray-900">Login</Link>
                        <Link to="#"
                           className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300">SignUp</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}