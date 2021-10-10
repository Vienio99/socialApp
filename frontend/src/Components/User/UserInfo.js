import React from "react";



export default function UserInfo() {
    return (
        <div className="d-flex align-items-center">
            <div className="pull-left p-r-10 fs-14 font-heading d-lg-inline-block d-none">
                <span className="semi-bold">Vienio</span> <span className=""></span>
            </div>
            <div className="dropdown pull-right d-lg-block">
                <button className="profile-dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" aria-label="profile dropdown">
                        <span className="thumbnail-wrapper d32 circular inline">
                                        <img src="/executive/assets/img/profiles/d2x.jpg" alt=""
                                             data-src="executive/assets/img/profiles/d2x.jpg"
                                             data-src-retina="executive/assets/img/profiles/d2x.jpg"
                                             width="32"
                                             height="32"/>
                                    </span>
                </button>
                <div className="dropdown-menu dropdown-menu-right profile-dropdown" role="menu">
                    <a href="#" className="dropdown-item"><span>Signed in as <br /><b>Vienio</b></span></a>
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
                        className="dropdown-item fs-12 hint-text">Last active: <br />2 days ago</span>
                </div>
            </div>
            {/*END User Info*/}
            <a href="#" className="header-icon m-l-10 sm-no-margin d-inline-block" data-toggle="quickview"
               data-toggle-element="#quickview">
                <i className="pg-icon btn-icon-link">menu_add</i>
            </a>
        </div>
    );
}