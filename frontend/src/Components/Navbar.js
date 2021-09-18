import React from "react";

export default function Navbar() {
    return (
        <div className="menu-bar header-sm-height" data-pages-init='horizontal-menu' data-hide-extra-li="4">
            <a href="#" className="btn-link header-icon toggle-sidebar d-lg-none" data-toggle="horizontal-menu">
                <i className="pg-icon">close</i>
            </a>
            <ul>
                <li>
                    <a href="index.html">Dashboard</a>
                </li>
                <li className=" active">
                    <a href="social.html">
                        <span className="title">Newest</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:">
                        <span className="title">Hottest</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:">
                        <span className="title">Favorites</span>
                    </a>
                </li>
                <li>
                    <a href="views.html">
                        <span className="title">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:"><span className="title">Extra</span>
                        <span className=" arrow"/></a>
                    <ul className="">
                        <li className="">
                            <a href="invoice.html">Invoice</a>
                        </li>
                        <li className="">
                            <a href="404.html">404 Page</a>
                        </li>
                        <li className="">
                            <a href="500.html">500 Page</a>
                        </li>
                        <li className="">
                            <a href="blank_template.html">Blank Page</a>
                        </li>
                        <li className="">
                            <a href="login.html">Login</a>
                        </li>
                        <li className="">
                            <a href="register.html">Register</a>
                        </li>
                        <li className="">
                            <a href="lock_screen.html">Lockscreen</a>
                        </li>
                        <li className="">
                            <a href="gallery.html">Gallery</a>
                        </li>
                        <li className="">
                            <a href="timeline.html">Timeline</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <a href="#" className="search-link d-flex justify-content-between align-items-center d-lg-none"
               data-toggle="search">Tap here to search <i className="pg-search float-right"/></a>
        </div>
    );
}