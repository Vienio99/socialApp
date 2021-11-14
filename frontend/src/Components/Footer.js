import React from "react";


function Footer() {
    return (
        // Footer
        <footer className="pt-6 pb-6 text-gray-700 bg-gray-300">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap text-left lg:text-left">
                    {/* Left text and github icon*/}
                    <div className="w-full px-4 lg:w-6/12">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
                        <h5 className="mt-0 mb-2 text-lg">
                            Find us on any of these platforms, we respond 1-2 business days.
                        </h5>
                        <div className="mt-3 mb-6 lg:mb-0">
                            <button
                                className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none hover:bg-yellow-400 align-center focus:outline-none"
                                type="button">
                                <svg className="mx-auto pb-2.5" xmlns="http://www.w3.org/2000/svg" width="30" height="50"
                                     viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Text on the right - Useful links */}
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="flex flex-wrap mb-6 items-top">
                            <div className="w-full px-4 ml-auto lg:w-4/12">
                                <span className="block mb-2 text-sm font-semibold uppercase text-blueGray-500">Useful Links</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="block pb-2 text-sm font-semibold hover:text-gray-900"
                                           href="">About Us</a>
                                    </li>
                                    <li>
                                        <a className="block pb-2 text-sm font-semibold hover:text-gray-900"
                                           href="">Github</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Text on the right - Other resources */}
                            <div className="w-full px-4 lg:w-4/12">
                                <span className="block mb-2 text-sm font-semibold uppercase">Other Resources</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="block pb-2 text-sm font-semibold hover:text-gray-900"
                                           href="">Terms &amp; Conditions</a>
                                    </li>
                                    <li>
                                        <a className="block pb-2 text-sm font-semibold hover:text-gray-900"
                                           href="">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a className="block pb-2 text-sm font-semibold hover:text-gray-900"
                                           href="">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom text */}
                <div className="flex flex-wrap items-center justify-center md:justify-between">
                    <div className="w-full px-4 mx-auto text-center md:w-4/12">
                        <div className="py-1 text-sm font-semibold text-blueGray-500">
                            Copyright © <span id="get-current-year">2021</span><a
                            href="#"
                            className="text-blueGray-500 hover:text-gray-800" target="_blank"> by
                            <a href=""
                               className="text-blueGray-500 hover:text-blueGray-800"> Vienio99</a>.</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;