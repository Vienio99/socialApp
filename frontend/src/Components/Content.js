import React, { Component }  from 'react';

function Content() {
    return (
        <div className="page-container ">
            {/*START PAGE CONTENT WRAPPER*/}
            <div className="page-content-wrapper ">
                {/*START PAGE CONTENT*/}
                <div className="content ">
                    <div className="social-wrapper">
                        <div className="social " data-pages="social">
                            {/*START JUMBOTRON*/}
                            <div className="jumbotron" data-social="cover" data-pages="parallax"
                                 data-scroll-element=".page-container">
                                <div className="cover-photo">
                                    <img alt="Cover photo" src="../executive/assets/img/social/cover.jpg"/>
                                </div>
                                <div className=" container    container-fixed-lg sm-p-l-0 sm-p-r-0">
                                    <div className="inner">
                                        <div className="pull-bottom bottom-left m-b-40 sm-p-l-15">
                                            <h5 className="text-white no-margin">welcome to pages social</h5>
                                            <h1 className="text-white no-margin"><span
                                                className="semi-bold">social</span> cover</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*END JUMBOTRON*/}
                            <div className=" container    container-fixed-lg sm-p-l-0 sm-p-r-0">
                                <div className="feed">
                                    {/*START DAY*/}
                                    <div className="day" data-social="day">
                                        {/*START ITEM*/}
                                        <div className="card card-borderless no-border bg-transparent full-width"
                                             data-social="item">
                                            {/*START CONTAINER FLUID*/}
                                            <div className="container-fluid p-t-30 p-b-30 ">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="container-xs-height">
                                                            <div className="row-xs-height">
                                                                <div
                                                                    className="social-user-profile col-xs-height text-center col-top">
                                                                    <div
                                                                        className="thumbnail-wrapper d48 circular bordered b-white">
                                                                        <img alt="Avatar" width="55" height="55"
                                                                             data-src-retina="assets/img/profiles/avatar_small2x.jpg"
                                                                             data-src="assets/img/profiles/avatar.jpg"
                                                                             src="../executive/assets/img/profiles/avatar.jpg"/>
                                                                    </div>
                                                                    <br/>
                                                                        <i className="pg-icon text-success m-t-10">tick_circle</i>
                                                                </div>
                                                                <div className="col-xs-height p-l-20">
                                                                    <h3 className="no-margin p-b-5">David Nester</h3>
                                                                    <p className="no-margin fs-16">is excited about the
                                                                        new pages design framework
                                                                    </p>
                                                                    <p className="hint-text m-t-5 small">San Fransisco
                                                                        Bay | CEO at Pages.inc
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*END CONTAINER FLUID*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;