import React from "react";
import UserInfo from './User/UserInfo';
import Navbar from "./Navbar";
import NotificationDropdown from "./NotificationDropdown";


function Header(props) {
    return (
        <div className="header">
            <div className="container">
                <div className="header-inner header-md-height">
                    <a href="#" className="btn-link toggle-sidebar d-lg-none header-icon sm-p-l-0 btn-icon-link"
                       data-toggle="horizontal-menu">
                        <i className="pg-icon">menu</i>
                    </a>
                    <NotificationDropdown />
                    {/*START User Info*/}
                    <UserInfo />
                    {/*END User Info*/}
                </div>
                <div className="header-inner justify-content-start header-lg-height title-bar">
                    <div className="brand inline align-self-end">
                        <img src="/executive/assets/img/logo_s.png" alt="logo" data-src="executive/assets/img/logo_s.png"
                             data-src-retina="executive/assets/img/logo_s_2x.png" width="17" height="20"/>
                    </div>
                    <h2 className="page-title align-self-end">
                        social
                    </h2>
                </div>
                <Navbar />
            </div>
        </div>
    );
}


export default Header;


