import React from "react";


function Header(props) {
    return (
        <div className="header">
            <div className="container">
                <div className="header-inner header-md-height">
                    <a href="#" className="btn-link toggle-sidebar d-lg-none header-icon sm-p-l-0 btn-icon-link"
                       data-toggle="horizontal-menu">
                        <i className="pg-icon">menu</i>
                    </a>
                    <div className="">
                        {/*START NOTIFICATION LIST*/}
                        <ul className="d-lg-inline-block d-none notification-list no-margin b-grey b-l b-r no-style p-l-0 p-r-20">
                            <li className="p-r-10 inline">
                                <div className="dropdown">
                                    <a href="javascript:" id="notification-center" className="header-icon btn-icon-link"
                                       data-toggle="dropdown">
                                        <i className="pg-icon">world</i>
                                        <span className="bubble"/>
                                    </a>
                                    {/*START Notification Dropdown*/}
                                    <div className="dropdown-menu notification-toggle" role="menu"
                                         aria-labelledby="notification-center">
                                        {/*START Notification*/}
                                        <div className="notification-panel">
                                            {/*START Notification Body*/}
                                            <div className="notification-body scrollable">
                                                {/*START Notification Item*/}
                                                <div className="notification-item unread clearfix">
                                                    {/*START Notification Item*/}
                                                    <div className="heading open">
                                                        <a href="#"
                                                           className="text-complete pull-left d-flex align-items-center">
                                                            <i className="pg-icon m-r-10">map</i>
                                                            <span className="bold">Carrot Design</span>
                                                            <span className="fs-12 m-l-10">David Nester</span>
                                                        </a>
                                                        <div className="pull-right">
                                                            <div
                                                                className="thumbnail-wrapper d16 circular inline m-t-15 m-r-10 toggle-more-details">
                                                                <div><i className="pg-icon">chevron_down</i>
                                                                </div>
                                                            </div>
                                                            <span className=" time">few sec ago</span>
                                                        </div>
                                                        <div className="more-details">
                                                            <div className="more-details-inner">
                                                                <h5 className="semi-bold fs-16">“Apple’s Motivation -
                                                                    Innovation <br />
                                                                        distinguishes between <br />
                                                                        A leader and a follower.”</h5>
                                                                <p className="small hint-text">
                                                                    Commented on john Smiths wall.
                                                                    <br /> via pages framework.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*END Notification Item*/}
                                                    {/*START Notification Item Right Side*/}
                                                    <div className="option" data-toggle="tooltip" data-placement="left"
                                                         title="mark as read">
                                                        <a href="#" className="mark"/>
                                                    </div>
                                                    {/*END Notification Item Right Side*/}
                                                </div>
                                                {/*START Notification Body*/}
                                                {/*START Notification Item*/}
                                                <div className="notification-item  clearfix">
                                                    <div className="heading">
                                                        <a href="#" className="text-danger pull-left">
                                                            <i className="pg-icon m-r-10">alert_warning</i>
                                                            <span className="bold">98% Server Load</span>
                                                            <span className="fs-12 m-l-10">Take Action</span>
                                                        </a>
                                                        <span className="pull-right time">2 mins ago</span>
                                                    </div>
                                                    {/*START Notification Item Right Side*/}
                                                    <div className="option">
                                                        <a href="#" className="mark"/>
                                                    </div>
                                                    {/*END Notification Item Right Side*/}
                                                </div>
                                                {/*END Notification Item*/}
                                                {/*START Notification Item*/}
                                                <div className="notification-item  clearfix">
                                                    <div className="heading">
                                                        <a href="#" className="text-warning pull-left">
                                                            <i className="pg-icon m-r-10">alert_warning</i>
                                                            <span className="bold">Warning Notification</span>
                                                            <span className="fs-12 m-l-10">Buy Now</span>
                                                        </a>
                                                        <span className="pull-right time">yesterday</span>
                                                    </div>
                                                    {/*START Notification Item Right Side*/}
                                                    <div className="option">
                                                        <a href="#" className="mark"/>
                                                    </div>
                                                    {/*END Notification Item Right Side*/}
                                                </div>
                                                {/*END Notification Item*/}
                                                {/*START Notification Item*/}
                                                <div className="notification-item unread clearfix">
                                                    <div className="heading">
                                                        <div
                                                            className="thumbnail-wrapper d24 circular b-white m-r-5 b-a b-white m-t-10 m-r-10">
                                                            <img width="30" height="30"
                                                                 data-src-retina="assets/img/profiles/1x.jpg"
                                                                 data-src="assets/img/profiles/1.jpg" alt=""
                                                                 src="assets/img/profiles/1.jpg"/>
                                                        </div>
                                                        <a href="#" className="text-complete pull-left">
                                                            <span className="bold">Revox Design Labs</span>
                                                            <span className="fs-12 m-l-10">Owners</span>
                                                        </a>
                                                        <span className="pull-right time">11:00pm</span>
                                                    </div>
                                                    {/*START Notification Item Right Side*/}
                                                    <div className="option" data-toggle="tooltip" data-placement="left"
                                                         title="mark as read">
                                                        <a href="#" className="mark"/>
                                                    </div>
                                                    {/*END Notification Item Right Side*/}
                                                </div>
                                                {/*END Notification Item*/}
                                            </div>
                                            {/*END Notification Body*/}
                                            {/*START Notification Footer*/}
                                            <div className="notification-footer text-center">
                                                <a href="#" className="">Read all notifications</a>
                                                <a data-toggle="refresh" className="portlet-refresh text-black pull-right"
                                                   href="#">
                                                    <i className="pg-refresh_new"/>
                                                </a>
                                            </div>
                                            {/*START Notification Footer*/}
                                        </div>
                                        {/*END Notification*/}
                                    </div>
                                    {/*END Notification Dropdown*/}
                                </div>
                            </li>
                            <li className="p-r-10 inline">
                                <a href="#" className="header-icon btn-icon-link">
                                    <i className="pg-icon">link_alt</i>
                                </a>
                            </li>
                            <li className="p-r-10 inline">
                                <a href="#" className="header-icon btn-icon-link">
                                    <i className="pg-icon">grid_alt</i>
                                </a>
                            </li>
                        </ul>
                        {/*END NOTIFICATIONS LIST*/}
                        <a href="#" className="search-link d-lg-inline-block d-none" data-toggle="search"><i
                            className="pg-icon">search</i>Type anywhere to <span className="bold">search</span></a>
                    </div>
                    <div className="d-flex align-items-center">
                        {/*START User Info*/}
                        <div className="pull-left p-r-10 fs-14 font-heading d-lg-inline-block d-none">
                            <span className="semi-bold">David</span> <span className="">Nest</span>
                        </div>
                        <div className="dropdown pull-right d-lg-block">
                            <button className="profile-dropdown-toggle" type="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" aria-label="profile dropdown">
                        <span className="thumbnail-wrapper d32 circular inline">
                                        <img src="" alt=""
                                             data-src="assets/img/profiles/avatar.jpg"
                                             data-src-retina="assets/img/profiles/avatar_small2x.jpg" width="32" height="32"/>
                                    </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right profile-dropdown" role="menu">
                                <a href="#" className="dropdown-item"><span>Signed in as <br /><b>David Aunsberg</b></span></a>
                                <div className="dropdown-divider"/>
                                <a href="#" className="dropdown-item">Your Profile</a>
                                <a href="#" className="dropdown-item">Your Activity</a>
                                <a href="#" className="dropdown-item">Your Archive</a>
                                <div className="dropdown-divider"/>
                                <a href="#" className="dropdown-item">Features</a>
                                <a href="#" className="dropdown-item">Help</a>
                                <a href="#" className="dropdown-item">Settings</a>
                                <a href="#" className="dropdown-item">Logout</a>
                                <div className="dropdown-divider"/>
                                <span
                                    className="dropdown-item fs-12 hint-text">Last edited by David<br />on Friday at 5:27PM</span>
                            </div>
                        </div>
                        {/*END User Info*/}
                        <a href="#" className="header-icon m-l-10 sm-no-margin d-inline-block" data-toggle="quickview"
                           data-toggle-element="#quickview">
                            <i className="pg-icon btn-icon-link">menu_add</i>
                        </a>
                    </div>
                </div>
                <div className="header-inner justify-content-start header-lg-height title-bar">
                    <div className="brand inline align-self-end">
                        <img src="" alt="logo" data-src="assets/img/logo_s.png"
                             data-src-retina="assets/img/logo_s_2x.png" width="17" height="20"/>
                    </div>
                    <h2 className="page-title align-self-end">
                        social
                    </h2>
                </div>
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
            </div>
        </div>
    );
}


export default Header;


