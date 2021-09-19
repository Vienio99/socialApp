import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function Navbar() {
    return (
        <Router>
            <div className="menu-bar header-sm-height" data-pages-init='horizontal-menu' data-hide-extra-li="4">
                <a href="#" className="btn-link header-icon toggle-sidebar d-lg-none" data-toggle="horizontal-menu">
                    <i className="pg-icon">close</i>
                </a>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className=" active">
                        <Link href="social.html">
                            <span className="title">Newest</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="javascript:">
                            <span className="title">Hottest</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="javascript:">
                            <span className="title">Favorites</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <span className="title">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <a href="javascript:"><span className="title">Extra</span>
                            <span className=" arrow"/></a>
                        <ul className="">
                            <li className="">
                                <Link href="invoice.html">Invoice</Link>
                            </li>
                            <li className="">
                                <Link href="404.html">404 Page</Link>
                            </li>
                            <li className="">
                                <Link href="500.html">500 Page</Link>
                            </li>
                            <li className="">
                                <Link href="blank_template.html">Blank Page</Link>
                            </li>
                            <li className="">
                                <Link href="login.html">Login</Link>
                            </li>
                            <li className="">
                                <Link href="register.html">Register</Link>
                            </li>
                            <li className="">
                                <Link href="lock_screen.html">Lockscreen</Link>
                            </li>
                            <li className="">
                                <Link href="gallery.html">Gallery</Link>
                            </li>
                            <li className="">
                                <Link href="timeline.html">Timeline</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <a href="#" className="search-link d-flex justify-content-between align-items-center d-lg-none"
                   data-toggle="search">Tap here to search <i className="pg-search float-right"/></a>
            </div>
        </Router>

    );
}